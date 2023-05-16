<template>
     <div class="mx-[10%] mt-20">
        <TabGroup as="div" class="transition-all duration-[1000] col-span-12">
              <TabList as="nav" class="border-b dark:border-slate-500 flex justify-between">
                <div>
                  <Tab v-for="tab in tabs" v-slot="{selected}" class="mr-5 focus:ring-0 focus:outline-none focus:border-none transition-all">
                    <button :class="[
                        selected ? 'bg-white dark:bg-slate-800 dark:border-slate-500 border-r border-l border-t rounded-t text-sky-800 shadow' : ''
                    ]" class="flex font-medium items-center space-x-2 px-4 py-1 whitespace-nowrap focus:ring-0 focus:border-none">
                     <span class=""> {{ tab }}</span>
                    </button>
                  </Tab>
                </div>
              </TabList>
              <TabPanels>
                  <TabPanel> <Users /> </TabPanel>

                  <TabPanel> <Twilio /> </TabPanel>

                <TabPanel> <Profile /> </TabPanel>

              </TabPanels>
            </TabGroup>
     </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import {ref} from "vue";
import Users from "@/pages/Settings/Users.vue";
import Twilio from "@/pages/Settings/Twilio.vue";
import Profile from "@/pages/Settings/Profile.vue";

 const tabs = ref([
    'Users & Permissions',
    'Twilio Credentials',
    'Profile',
  ]);

</script>

<style scoped>

</style>