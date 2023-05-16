<template>
    <div class="mt-10">
        <table>
            <tr>
                <td class="py-2 pr-2">
                    <span>Account SID	</span>
                </td>
                <td class="py-2 pl-2">
                    <input type="text" name="sid" id="sid" class="shadow-sm focus:ring-indigo-500 focus:border-sky-500 block w-[300px] sm:text-sm border-gray-300 rounded-md" placeholder="-----">
                </td>
            </tr>

            <tr>
                <td class="py-2 pr-2">
                    <span>Auth Token</span>
                </td>
                <td class="py-2 pl-2">
                    <input type="password" name="token" id="token" class="shadow-sm focus:ring-indigo-500 focus:border-sky-500 block w-[300px] sm:text-sm border-gray-300 rounded-md" placeholder="******">
                </td>
            </tr>

            <tr>
                <td class="py-2 pr-2">
                    <span>Twilio Number</span>
                </td>
                <td class="py-2 pl-2">
                    <input type="text" name="num" id="num" class="shadow-sm focus:ring-indigo-500 focus:border-sky-500 block w-[300px] sm:text-sm border-gray-300 rounded-md" placeholder="******">
                </td>
            </tr>
            <tr>
                <td class="py-2 pr-2">
                </td>
                <td class="py-2 pl-2">
                    <div class="flex space-x-2">
                        <CButton variant="primary">Update</CButton>
                        <CButton variant="secondary">Cancel</CButton>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>

import CButton from "@/components/elements/CButton.vue";
</script>

<style scoped>

</style>