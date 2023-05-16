import util from './util/index'
import * as stringFilters from './string/index'
import * as arrayFilters from './array/index'
import * as otherFilters from './other/index'

const AppFilters = {
  ...arrayFilters,
  ...stringFilters,
  ...util,
  ...otherFilters
}
export default AppFilters;
