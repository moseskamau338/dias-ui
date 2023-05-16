<template>
   <div class="bg-white dark:bg-slate-800 pt-4 mx-[20%] rounded px-2 py-4 border border-slate-200 dark:border-slate-500 shadow mt-40">
        <h1 class="text-xl text-slate-600 dark:text-slate-300 font-medium mx-8">
            Welcome to the Ministry of  Foreign and Diaspora Affairs
        </h1>
       <p class="text-sm mx-8 text-slate-500 mt-4">Choose a service below:</p>
        <div class="grid grid-cols-4 gap-4 mt-4 px-8">
            <div v-for="item in [
                {icon:'bulk-sms', icon_class:'h-12', title:'Bulk Messaging', description:'Send bulk messages to contacts and categories as required', route:'bulk-sms'},
                {icon:'contacts-color', icon_class:'h-8', title:'Citizen Contacts', description:'Citizen Contacts', route:'contacts'},
                {icon:'queries-color', icon_class:'h-12', title:'Diaspora Queries', description:'Diaspora Queries', route:'queries'},
                {icon:'dashboard-color', icon_class:'h-8', title:'Admin Dashboard', description:'Admin Dashboard', route:'dashboard'},
            ]"
                 class="cursor-pointer border border-slate-200 hover:shadow-lg transition-all duration-300 col-span-2 flex space-x-2 align-items-start p-2 rounded group" @click="$router.push({name: item.route})">
                <SvgIcon :name="item.icon" :class="item.icon_class" />
                <div>
                      <h2 class="text-lg font-bold text-slate-500 group-hover:text-slate-600">{{ item.title }}</h2>
                      <p class="text-sm text-slate-400">{{item.description}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@/components/elements/SvgIcon.vue";

export default {
    name: "Home",
    components: {SvgIcon}
}
</script>

<style scoped>

</style>