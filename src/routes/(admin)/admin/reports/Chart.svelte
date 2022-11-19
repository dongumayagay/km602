<script>
let data_labels = ['January', 'Febuary', 'March', 'April', 'May', 'June'];
let rect_x = 26;
</script>

<div class="bg-base-100 mt-6 rounded-xl shadow-md">
    <div class="mx-8 mt-8">
        <h1 class="font-semibold text-2xl">Monthly Profit Report</h1>
        <div class=" mt-4 mb-4 flex justify-between">
            <select class="border-2">
                <option>Monthly</option>
                <option>Yearly</option>
            </select>
            <div class="flex">
                <p class="pr-2">From:</p>
                <select class="border-2 mr-8">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                </select>
                <p class="pr-2">To:</p>
                <select class="border-2">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                </select>
            </div>
        </div>
        <div class="flex gap-8">
            <div>
                <p class="text-sm font-semibold text-gray-500">Date of Highest Profit:
                <br>
                <span class="text-2xl font-normal text-gray-900">January 3, 2022</span><br><span class="text-xs font-normal">1200 PHP Gained profit</span></p>
            </div>
            <div>
                <p class="text-sm font-semibold text-gray-500">Today's Total Profit
                <br>
                <span class="text-2xl font-normal text-gray-900">1200 PHP</span><br><span class="text-xs font-normal">November 3, 2022 Thursday</span></p>
            </div>
        </div>
        
    </div>
    <svg class="font-sans" version="1.1" xmlns="http://www.w3.org/2000/svg" width="950" height="500" viewBox="0 0 850 400" aria-hidden="false" aria-label="Interactive chart">
        <g data-z-index="1" aria-hidden="true">
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 364.5 L 640 364.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 301.5 L 640 301.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 237.5 L 640 237.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 174.5 L 640 174.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 110.5 L 640 110.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 46.5 L 640 46.5" opacity="1"></path>
            <path fill="none" stroke="#e6e6e6" stroke-width="1" stroke-dasharray="none" data-z-index="1" d="M 68 46.5 L 640 46.5" opacity="1"></path>
        </g>
        <g data-z-index="2" aria-hidden="true">
            <path fill="none" stroke="#ccd6eb" stroke-width="1" data-z-index="7" d="M 68 364.5 L 640 364.5"></path>
        </g>
        <g data-z-index="3" aria-hidden="false">
            <g data-z-index="0.1" opacity="1" transform="translate(68,47) scale(1 1)" clip-path="url(#highcharts-dp279n5-267-)" style="cursor: pointer;" aria-hidden="false">
            <rect x=26 y="166" width="30" height="152" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Monday, 48. Item 1." style="outline: none;"></rect>
            <rect x="108" y="137" width="30" height="181" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Tuesday, 57. Item 1." style="outline: none;"></rect>
            <rect x="190" y="61" width="30" height="257" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Wednesday, 81. Item 1." style="outline: none;"></rect>
            <rect x="271" y="175" width="30" height="143" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Thursday, 45. Item 1." style="outline: none;"></rect>
            <rect x="353" y="204" width="30" height="114" fill="#6f58e9" opacity="1" tabindex="-1" role="img" aria-label="Friday, 36. Item 1." style="outline: none;"></rect>
            <rect x="435" y="68" width="30" height="250" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Saturday, 79. Item 1." style="outline: none;"></rect>
            <rect x="516" y="172" width="30" height="146" fill="rgb(111,88,233)" opacity="1" tabindex="-1" role="img" aria-label="Sunday, 46. Item 1." style="outline: none;"></rect>
        </g>

        <g data-z-index="7" aria-hidden="true" class="font-sans text-xs">
            <text x="109" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Monday</text>
            <text x="191" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Tuesday</text>
            <text x="272" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Wednesday</text>
            <text x="354" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Thursday</text>
            <text x="436" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Friday</text>
            <text x="517" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Saturday</text>
            <text x="599" text-anchor="middle" transform="translate(0,0)" y="383" opacity="1">Sunday</text>
        </g>
        <g data-z-index="7" aria-hidden="true">
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="369" opacity="1">0</text>
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="305" opacity="1">20</text>
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="242" opacity="1">40</text>
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="178" opacity="1">60</text>
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="115" opacity="1">80</text>
            <text class="font-sans"  x="53" text-anchor="end" transform="translate(0,0)" style="color: rgb(102, 102, 102); cursor: default; font-size: 11px; fill: rgb(102, 102, 102);" y="52" opacity="1">100</text>
        </g>
    </svg>


</div>


<!-- label -->
<!-- 81.7142857143 -->
<!-- 81.7142857143 -->