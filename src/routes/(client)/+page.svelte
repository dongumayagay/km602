<svelte:head>
	<title>Home | km602</title>
</svelte:head>


<main>
    <!-- banner -->
    <div class="hero min-h-screen" style="background-image: url(/img/hero_km3.jpg);">
        <div class="hero-overlay bg-sky-700/60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold leading-snug">Brand New Touch Brand New Car</h1>
                <p class="mb-5 font-medium">Go for a pampered wash where every car is pampered to look like new ― the ultimate full service wash. Let us wash it for you</p>
                <a href="/book" class="btn btn-ghost bg-yellow-400 text-white rounded-full capitalize px-8 text-base hover:bg-yellow-300">Book Now</a>
              </div>
        </div>
    </div>



    <!-- why -->
    <div class="min-h-full text-center text-sky-700 pb-36 lg:px-16">
        <p class="text-4xl my-16"><span class="font-bold">Why</span> km602?</p>
        <div class="lg:grid lg:grid-cols-3 lg:gap-x-16 px-8">
            <center>
                <img alt="book" src="/img/booking.webp" class="w-1/2 my-2">
                <p class="text-lg font-semibold block lg:hidden">Customer Convenience
                    <br><span class="font-normal text-sm">We provide booking service system as per the client convenience</span>
                </p>
            </center>
            <center>
                <img alt="time" src="/img/save_time.webp" class="w-1/2 my-2">
                <p class="text-lg font-semibold block lg:hidden">Saves Your Time
                    <br><span class="font-normal text-sm">We respect the time of our customer, we help you to take care of your vehicle</span>
                </p>
            </center>
            <center>
                <img alt="train" src="/img/train.webp" class="w-1/2 my-2">
                <p class="text-lg font-semibold block lg:hidden">Highly Trained Washers
                    <br><span class="font-normal text-sm">Our washing expert are fully trained and professional</span>
                </p>
            </center>
        </div>
        <div class="lg:grid lg:grid-cols-3 text-lg font-semibold lg:gap-x-16 hidden">
            <p>Customer Convenience
                <br><span class="font-normal text-sm">We provide booking service system as per the client convenience</span>
            </p>
            <p>Saves Your Time
                <br><span class="font-normal text-sm">We respect the time of our customer, we help you to take care of your vehicle</span>
            </p>
            <p>Highly Trained Washers
                <br><span class="font-normal text-sm">Our washing expert are fully trained and professional</span>
            </p>
        </div>
    </div>



    <!-- about -->
    <div class="min-h-[3/4] bg-blue-50 lg:px-16 px-4 py-6">
        <div class="hero-content gap-16 flex-col lg:flex-row">
            <img alt="header" src="/img/km2.jpg" class="lg:w-1/2 bg-slate-500 shadow-xl shadow-slate-500/50">
            <div>
                <h1 class="mb-5 text-4xl leading-snug text-sky-700">Get to Know <span class="font-bold">About </span>Us</h1>
                <p class="mb-5 text-sky-700 font-medium">
                    Km602 is an innovative carwash that allows you to book your carwash anywhere and everywhere!
                </p>
                <a href="/about" class="btn btn-ghost mb-16 bg-yellow-400 text-white rounded-full capitalize px-8 text-base hover:bg-yellow-300">About us</a>
            </div>
        </div>
    </div>



    <!-- services -->
    <div class="min-h-full text-center text-sky-700 pb-36  lg:px-16 px-4 py-20">
        <p class="text-4xl py-16">Our <span class="font-bold">Services</span></p>
        <table class="table-auto w-full text-sm">
            <thead>
                <tr class="bg-blue-50">
                    <th class="py-6 rounded-l-lg">Car Type</th>
                    <th class="py-6">Full Wash</th>
                    <th class="py-6">Pressure Wash Only</th>
                    <th class="py-6">Inner Only</th>
                    <th class="py-6 rounded-r-lg">Outer Only</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-100">
                    <td class="py-6 font-medium">Jeepney</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                </tr>
                <tr class="border-b border-gray-100 bg-slate-100">
                    <td class="py-6 font-medium">Tricycle</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                </tr>
                <tr class="border-b border-gray-100">
                    <td class="py-6 font-medium">SUV</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                </tr>
                <tr class="border-b border-gray-100 bg-slate-100">
                    <td class="py-6 font-medium">Sedan</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                </tr>
                <tr class="border-b border-gray-100">
                    <td class="py-6 font-medium">Van</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                </tr>
                <tr class="border-b border-gray-100 bg-slate-100">
                    <td class="py-6 font-medium">Motorcycle</td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                    <td class="py-6">
                        <center><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg></center>
                    </td>
                </tr>
            </tbody>
        </table>
        <center><a href="/services" class="btn btn-ghost my-16 bg-yellow-400 text-white rounded-full capitalize px-8 text-base hover:bg-yellow-300">learn more</a></center>
    </div>

    
    <div class="h-60"></div>

</main>



