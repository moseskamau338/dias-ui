export class Validator{
      // takes a reactive state & validates all keys
      //state is a key value object
      // also takes options e.g. overridden rules
      //  are functions that return boolean (true) or a string in case of error
        //const result = validate(state)
      /* @var(result)
          *  - [key].error - @Boolean
          *  - [key].errors = [] of errors
          *  - [key].formatted_errors = @String of full error formatted
          * */
    rules;
    state;

    constructor(state = [], rules = null) {
        this.state = state
        this.rules = this.defaultRules()
        if (rules){
            this.rules = {...rules,...this.defaultRules()}
        }
    }
    validate(items) {
        let validations = {}
        Object.keys(items).forEach(key => {
            let general_rule = items[key]
            let rules = general_rule.split('|')
            for (let i = 0; i < rules.length; i++) {
                let rule = rules[i],
                    split_rule = rule.split(':')
                let args = split_rule.length > 1 ? split_rule.slice(1) : []


                if (split_rule.length > 1){
                    //has args
                    //this.rules[split_rule[0]](key, this.state[key], args)
                }else{
                    this.state.forEach((obj, index) => {
                        this.rules[split_rule[0]](key, obj[key])
                        validations[index] = validations[index]? validations[index] : {}
                        validations[index][key] = this[key] ? this[key] : true
                    })
                }

            }

        })

        return validations
    }

    defaultRules(){
        const numeral_regex = /^\d+$/
        const mail_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        return {
            email: (prop, value, options = {
                errorMessage:'The value is not a valid email',
            }) => {
                if (mail_regex.test(value)) {
                    this.assignPass(prop)
                }else{
                   this.assignError(prop, options.errorMessage)
                }
            },
            password: (prop, value, options = {
                minLength: {value: 6, errorMessage: 'Password length must be 6 or more characters'},
            }) => {
                if (value.length === options.minLength) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, options.minLength.errorMessage)
                }
            },
            sameAs: (prop, value, input) => {
                if(value === input) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, value, 'Values are not the same')
                }
            },
            numeric: (prop, value) => {
                 console.log('Check Numeric rule: ', typeof this.assignPass)
                if(typeof value === "number" && numeral_regex.test(value)) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, 'Value is not a valid number')
                }
            },
            min: (prop, value, input) => {
                if(typeof value === "number" && value >= input) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, `Value must be greater than or equal to ${input}`)
                }
            },
            max: (prop, value, input) => {
                if(typeof value === "number" && value <= input) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, `Value must be less than or equal to ${input}`)
                }
            },
            alphaNumeric(prop,value){
                if (/^[a-zA-Z0-9]/.test(value)) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, 'Value should only contain letters and numbers. No special characters allowed')
                }
            },
            alphabetical(prop, value){
                console.log('Check Alpha rule: ', typeof this.assignPass)
                if (/^[a-zA-Z]/.test(value)) {
                    this.assignPass(prop)
                }else{
                    this.assignError(prop, 'Value should only contain letters. No numbers or special characters allowed')
                }
            }
        }
    }
    formatError(prop,errors){
        let message = 'Validation errors: <br />'
        errors.forEach(error => {
            message += error
            message += "<br /> - "
        })
        this[prop]['formatted_errors'] = message
    }
    assignPass(prop){
        this[prop] = this[prop] ?
            this[prop] :
            this[prop] = {
                error: false,
                errors: []
            }

    }
    assignError(prop, error){
        this[prop] = this[prop] ?
            this[prop] :
            this[prop] = {
                error: true,
                errors: []
            }


        this[prop]['errors'].push(error)
        this.formatError(prop, this[prop]['errors'])
    }
    removeError(prop, error){
        this[prop]['errors'].splice(this[prop]['errors'].indexOf(error), 1)
        if (this[prop]['errors'].length <= 0){
            this[prop]['error'] = false
        }
        this.formatError(prop, this[prop]['errors'])
    }
}