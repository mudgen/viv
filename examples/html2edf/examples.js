export const examples = [];
examples[0] =
`<!-- https://bulma.io -->
<div>
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br />
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>`
examples[1] =
  `<!-- This example requires Tailwind CSS v1.4.0+ -->
<div class="relative bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div class="lg:w-0 lg:flex-1">
        <a href="#" class="flex">
          <img class="h-8 w-auto sm:h-10" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" />
        </a>
      </div>
      <div class="-mr-2 -my-2 md:hidden">
        <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
          <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      <nav class="hidden md:flex space-x-10">
        <div class="relative">
          <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
          <button type="button" class="text-gray-500 group inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
            <span>Solutions</span>
            <!-- Item active: "text-gray-600", Item inactive: "text-gray-400" -->
            <svg class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!--
            'Solutions' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
          <div class="absolute -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
            <div class="rounded-lg shadow-lg">
              <div class="rounded-lg shadow-xs overflow-hidden">
                <div class="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Analytics
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Get a better understanding of where your traffic is coming from.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Engagement
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Speak directly to your customers in a more meaningful way.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Security
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Your customers data will be safe and secure.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Integrations
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Connect with third-party tools that you’re already using.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Automations
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Build strategic funnels that will drive your customers to convert
                      </p>
                    </div>
                  </a>
                </div>
                <div class="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                  <div class="flow-root">
                    <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
                      <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span>Watch Demo</span>
                    </a>
                  </div>
                  <div class="flow-root">
                    <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md text-base leading-6 font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150">
                      <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span>Contact Sales</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a href="#" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
          Pricing
        </a>
        <a href="#" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
          Docs
        </a>

        <div class="relative">
          <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
          <button type="button" class="text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
            <span>More</span>
            <!-- Item active: "text-gray-600", Item inactive: "text-gray-400" -->
            <svg class="text-gray-400 h-5 w-5 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!--
            'More' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          -->
          <div class="absolute left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
            <div class="rounded-lg shadow-lg">
              <div class="rounded-lg shadow-xs overflow-hidden">
                <div class="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Help Center
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Get all of your questions answered in our forums or contact support.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Guides
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Learn how to maximize our platform to get the most out of it.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Events
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        See what meet-ups and other events we might be planning near you.
                      </p>
                    </div>
                  </a>
                  <a href="#" class="-m-3 p-3 flex items-start space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    <div class="space-y-1">
                      <p class="text-base leading-6 font-medium text-gray-900">
                        Security
                      </p>
                      <p class="text-sm leading-5 text-gray-500">
                        Understand how we take your privacy seriously.
                      </p>
                    </div>
                  </a>
                </div>
                <div class="px-5 py-5 bg-gray-50 space-y-5 sm:px-8 sm:py-8">
                  <div class="space-y-4">
                    <h3 class="text-sm leading-5 tracking-wide font-medium text-gray-500 uppercase">
                      Recent Posts
                    </h3>
                    <ul class="space-y-4">
                      <li class="text-base leading-6 truncate">
                        <a href="#" class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                          Boost your conversion rate
                        </a>
                      </li>
                      <li class="text-base leading-6 truncate">
                        <a href="#" class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                          How to use search engine optimization to drive traffic to your site
                        </a>
                      </li>
                      <li class="text-base leading-6 truncate">
                        <a href="#" class="font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
                          Improve your customer experience
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="text-sm leading-5">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                      View all posts &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <a href="#" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">
          Sign in
        </a>
        <span class="inline-flex rounded-md shadow-sm">
          <a href="#" class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
            Sign up
          </a>
        </span>
      </div>
    </div>
  </div>

  <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  -->
  <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
    <div class="rounded-lg shadow-lg">
      <div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
        <div class="pt-5 pb-6 px-5 space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <img class="h-8 w-auto" src="/img/logos/workflow-mark-on-white.svg" alt="Workflow" />
            </div>
            <div class="-mr-2">
              <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <nav class="grid row-gap-8">
              <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Analytics
                </div>
              </a>
              <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                </svg>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Engagement
                </div>
              </a>
              <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Security
                </div>
              </a>
              <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/>
                </svg>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Integrations
                </div>
              </a>
              <a href="#" class="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                <svg class="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <div class="text-base leading-6 font-medium text-gray-900">
                  Automations
                </div>
              </a>
            </nav>
          </div>
        </div>
        <div class="py-6 px-5 space-y-6">
          <div class="grid grid-cols-2 row-gap-4 col-gap-8">
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Pricing
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Docs
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Enterprise
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Blog
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Help Center
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Guides
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Security
            </a>
            <a href="#" class="text-base leading-6 font-medium text-gray-900 hover:text-gray-700 transition ease-in-out duration-150">
              Events
            </a>
          </div>
          <div class="space-y-6">
            <span class="w-full flex rounded-md shadow-sm">
              <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                Sign up
              </a>
            </span>
            <p class="text-center text-base leading-6 font-medium text-gray-500">
              Existing customer?
              <a href="#" class="text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`

examples[2] =
  `<form action="http://maps.google.com/maps" method="get" target="_blank">
<label for="saddr">Enter your location</label>
<input type="text" name="saddr" />
<input type="hidden" name="daddr" value="350 5th Ave New York, NY 10018 (Empire State Building)" />
<input type="submit" value="Get directions" />
</form>`
examples[3] =
  `<footer class="page-footer">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">Footer Content</h5>
        <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="white-text">Links</h5>
        <ul>
          <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
          <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
          <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
          <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
    © 2014 Copyright Text
    <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
    </div>
  </div>
</footer>`
examples[4] =
  `<!-- https://materializecss.com -->
  <div class="row">
  <div class="col s12 m7">
    <div class="card">
      <div class="card-image">
        <img src="images/sample-1.jpg">
        <span class="card-title">Card Title</span>
      </div>
      <div class="card-content">
        <p>I am a very simple card. I am good at containing small bits of information.
        I am convenient because I require little markup to use effectively.</p>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
  </div>
</div>`;


examples[5] = `<div class="bg-gray-50">
<div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
  <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
    Ready to dive in?
    <br />
    <span class="text-indigo-600">Start your free trial today.</span>
  </h2>
  <div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
    <div class="inline-flex rounded-md shadow">
      <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
        Get started
      </a>
    </div>
    <div class="ml-3 inline-flex rounded-md shadow">
      <a href="#" class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
        Learn more
      </a>
    </div>
  </div>
</div>
</div>`

examples[6] = `  <!-- Start Top Bar -->
<div class="top-bar">
  <div class="top-bar-left">
    <ul class="menu">
      <li class="menu-text">Blog</li>
      <li><a href="#">One</a></li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
</div>
<!-- End Top Bar -->

<div class="callout large primary">
  <div class="row column text-center">
    <h1>Our Blog</h1>
    <h2 class="subheader">Such a Simple Blog Layout</h2>
  </div>
</div>

<!-- We can now combine rows and columns when there's only one column in that row -->
<div class="row medium-8 large-7 columns">
  <div class="blog-post">
    <h3>Awesome blog post title <small>3/6/2015</small></h3>
    <img class="thumbnail" src="https://placehold.it/850x350">
    <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.</p>
    <div class="callout">
      <ul class="menu simple">
        <li><a href="#">Author: Mike Mikers</a></li>
        <li><a href="#">Comments: 3</a></li>
      </ul>
    </div>
  </div>

  <div class="blog-post">
    <h3>Awesome blog post title <small>3/6/2015</small></h3>
    <img class="thumbnail" src="https://placehold.it/850x350">
    <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.</p>
    <div class="callout">
      <ul class="menu simple">
        <li><a href="#">Author: Mike Mikers</a></li>
        <li><a href="#">Comments: 3</a></li>
      </ul>
    </div>
  </div>

  <div class="blog-post">
    <h3>Awesome blog post title <small>3/6/2015</small></h3>
    <img class="thumbnail" src="https://placehold.it/850x350">
    <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.</p>
    <div class="callout">
      <ul class="menu simple">
        <li><a href="#">Author: Mike Mikers</a></li>
        <li><a href="#">Comments: 3</a></li>
      </ul>
    </div>
  </div>

  <div class="blog-post">
    <h3>Awesome blog post title <small>3/6/2015</small></h3>
    <img class="thumbnail" src="https://placehold.it/850x350">
    <p>Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus.</p>
    <div class="callout">
      <ul class="menu simple">
        <li><a href="#">Author: Mike Mikers</a></li>
        <li><a href="#">Comments: 3</a></li>
      </ul>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.js"></script>
<script>
  $(document).foundation();
</script>`

examples[7] = `<nav class="uk-navbar uk-margin-large-bottom">
<a class="uk-navbar-brand uk-hidden-small" href="layouts_frontpage.html">Brand</a>
<ul class="uk-navbar-nav uk-hidden-small">
    <li>
        <a href="layouts_frontpage.html">Frontpage</a>
    </li>
    <li>
        <a href="layouts_portfolio.html">Portfolio</a>
    </li>
    <li class="uk-active">
        <a href="layouts_blog.html">Blog</a>
    </li>
    <li>
        <a href="layouts_documentation.html">Documentation</a>
    </li>
    <li>
        <a href="layouts_contact.html">Contact</a>
    </li>
    <li>
        <a href="layouts_login.html">Login</a>
    </li>
</ul>
<a href="#offcanvas" class="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
<div class="uk-navbar-brand uk-navbar-center uk-visible-small">Brand</div>
</nav>

<div class="uk-grid" data-uk-grid-margin>
<div class="uk-width-medium-3-4">

    <article class="uk-article">

        <h1 class="uk-article-title">
            <a href="layouts_post.html">Article Heading</a>
        </h1>

        <p class="uk-article-meta">Written by Author on 12 April 2013. Posted in <a href="#">Blog</a></p>

        <p>
            <a href="layouts_post.html"><img width="900" height="300" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZo=" alt=""></a>
        </p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <h2>Subheading</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>
            <a class="uk-button uk-button-primary" href="layouts_post.html">Continue Reading</a>
            <a class="uk-button" href="layouts_post.html">4 Comments</a>
        </p>

    </article>

    <article class="uk-article">

        <h1 class="uk-article-title">
            <a href="layouts_post.html">Article Heading</a>
        </h1>

        <p class="uk-article-meta">Written by Author on 12 April 2013. Posted in <a href="#">Blog</a></p>

        <p>
            <a href="layouts_post.html"><img width="900" height="300" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iOTAwcHgiIGhlaWdodD0iMzAwcHgiIHZpZXdCb3g9IjAgMCA5MDAgMzAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA5MDAgMzAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSI5MDAiIGhlaWdodD0iMzAwIi8+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0zNzguMTg0LDkzLjV2MTEzaDE0My42MzN2LTExM0gzNzguMTg0eiBNNTEwLjI0NCwxOTQuMjQ3SDM5MC40Mzd2LTg4LjQ5NGgxMTkuODA4TDUxMC4yNDQsMTk0LjI0Nw0KCQlMNTEwLjI0NCwxOTQuMjQ3eiIvPg0KCTxwb2x5Z29uIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMzk2Ljg4MSwxODQuNzE3IDQyMS41NzIsMTU4Ljc2NCA0MzAuODI0LDE2Mi43NjggNDYwLjAxNSwxMzEuNjg4IDQ3MS41MDUsMTQ1LjQzNCANCgkJNDc2LjY4OSwxNDIuMzAzIDUwNC43NDYsMTg0LjcxNyAJIi8+DQoJPGNpcmNsZSBmaWxsPSIjRDhEOEQ4IiBjeD0iNDI1LjQwNSIgY3k9IjEyOC4yNTciIHI9IjEwLjc4NyIvPg0KPC9nPg0KPC9zdmc+DQo=" alt=""></a>
        </p>

        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <h2>Subheading</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>
            <a class="uk-button uk-button-primary" href="layouts_post.html">Continue Reading</a>
            <a class="uk-button" href="layouts_post.html">4 Comments</a>
        </p>

    </article>

    <ul class="uk-pagination">
        <li class="uk-disabled"><span><i class="uk-icon-angle-double-left"></i></span></li>
        <li class="uk-active"><span>1</span></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><span>...</span></li>
        <li><a href="#">20</a></li>
        <li><a href="#"><i class="uk-icon-angle-double-right"></i></a></li>
    </ul>

</div>

<div class="uk-width-medium-1-4">
    <div class="uk-panel uk-panel-box uk-text-center">
        <img class="uk-border-circle" width="120" height="120" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMTIwcHgiIGhlaWdodD0iMTIwcHgiIHZpZXdCb3g9IjAgMCAxMjAgMTIwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMjAgMTIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGRkZGRkYiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIi8+DQo8Zz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNMTA5LjM1NCw5OS40NzhjLTAuNTAyLTIuODA2LTEuMTM4LTUuNDA0LTEuOTAzLTcuODAxYy0wLjc2Ny0yLjM5Ny0xLjc5Ny00LjczMi0zLjA5My03LjAxMQ0KCQljLTEuMjk0LTIuMjc2LTIuNzc4LTQuMjE3LTQuNDU1LTUuODIzYy0xLjY4MS0xLjYwNC0zLjcyOS0yLjg4Ny02LjE0OC0zLjg0NmMtMi40MjEtMC45NTgtNS4wOTQtMS40MzgtOC4wMTctMS40MzgNCgkJYy0wLjQzMSwwLTEuNDM3LDAuNTE2LTMuMDIsMS41NDVjLTEuNTgxLDEuMDMyLTMuMzY3LDIuMTgyLTUuMzU1LDMuNDVjLTEuOTksMS4yNzEtNC41NzgsMi40MjEtNy43NjUsMy40NTENCgkJQzY2LjQxLDgzLjAzNyw2My4yMSw4My41NTIsNjAsODMuNTUyYy0zLjIxMSwwLTYuNDEtMC41MTUtOS41OTgtMS41NDZjLTMuMTg4LTEuMDMtNS43NzctMi4xODEtNy43NjUtMy40NTENCgkJYy0xLjk5MS0xLjI2OS0zLjc3NC0yLjQxOC01LjM1NS0zLjQ1Yy0xLjU4Mi0xLjAyOS0yLjU4OC0xLjU0NS0zLjAyLTEuNTQ1Yy0yLjkyNiwwLTUuNTk4LDAuNDc5LTguMDE3LDEuNDM4DQoJCWMtMi40MiwwLjk1OS00LjQ3MSwyLjI0MS02LjE0NiwzLjg0NmMtMS42ODEsMS42MDYtMy4xNjQsMy41NDctNC40NTgsNS44MjNjLTEuMjk0LDIuMjc4LTIuMzI2LDQuNjEzLTMuMDkyLDcuMDExDQoJCWMtMC43NjcsMi4zOTYtMS40MDIsNC45OTUtMS45MDYsNy44MDFjLTAuNTAyLDIuODAzLTAuODM5LDUuNDE1LTEuMDA2LDcuODM1Yy0wLjE2OCwyLjQyMS0wLjI1Miw0LjkwMi0wLjI1Miw3LjQ0DQoJCWMwLDEuODg0LDAuMjA3LDMuNjI0LDAuNTgyLDUuMjQ3aDEwMC4wNjNjMC4zNzUtMS42MjMsMC41ODItMy4zNjMsMC41ODItNS4yNDdjMC0yLjUzOC0wLjA4NC01LjAyLTAuMjUzLTcuNDQNCgkJQzExMC4xOTIsMTA0Ljg5MywxMDkuODU3LDEwMi4yOCwxMDkuMzU0LDk5LjQ3OHoiLz4NCgk8cGF0aCBmaWxsPSIjRTBFMEUwIiBkPSJNNjAsNzguMTZjNy42MiwwLDE0LjEyNi0yLjY5NiwxOS41Mi04LjA4OGM1LjM5Mi01LjM5Myw4LjA4OC0xMS44OTgsOC4wODgtMTkuNTE5DQoJCXMtMi42OTYtMTQuMTI2LTguMDg4LTE5LjUxOUM3NC4xMjYsMjUuNjQzLDY3LjYyLDIyLjk0Niw2MCwyMi45NDZzLTE0LjEyOCwyLjY5Ny0xOS41MTksOC4wODkNCgkJYy01LjM5NCw1LjM5Mi04LjA4OSwxMS44OTctOC4wODksMTkuNTE5czIuNjk1LDE0LjEyNiw4LjA4OSwxOS41MTlDNDUuODcyLDc1LjQ2NCw1Mi4zOCw3OC4xNiw2MCw3OC4xNnoiLz4NCjwvZz4NCjwvc3ZnPg0K" alt="">
        <h3>Author Name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut.</p>
    </div>
    <div class="uk-panel">
        <h3 class="uk-panel-title">Archives</h3>
        <ul class="uk-list uk-list-line">
            <li><a href="#">January 2014</a></li>
            <li><a href="#">December 2013</a></li>
            <li><a href="#">November 2013</a></li>
            <li><a href="#">October 2013</a></li>
            <li><a href="#">September 2013</a></li>
        </ul>
    </div>
    <div class="uk-panel">
        <h3 class="uk-panel-title">Social Links</h3>
        <ul class="uk-list">
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
        </ul>
    </div>
</div>
</div>

</div>

<div id="offcanvas" class="uk-offcanvas">
<div class="uk-offcanvas-bar">
<ul class="uk-nav uk-nav-offcanvas">
    <li>
        <a href="layouts_frontpage.html">Frontpage</a>
    </li>
    <li>
        <a href="layouts_portfolio.html">Portfolio</a>
    </li>
    <li class="uk-active">
        <a href="layouts_blog.html">Blog</a>
    </li>
    <li>
        <a href="layouts_documentation.html">Documentation</a>
    </li>
    <li>
        <a href="layouts_contact.html">Contact</a>
    </li>
    <li>
        <a href="layouts_login.html">Login</a>
    </li>
</ul>
</div>
</div>`