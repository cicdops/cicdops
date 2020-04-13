<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">

<div class="w-full max-w-screen-xl relative mx-auto px-6 pt-16 pb-40 md:pb-24">
        <div class="xl:flex -mx-6">
          <div class="px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto">
            <h1 class="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light leading-tight"><span class="sm:block text-Indigo-500 font-normal">持续集成，持续发布，持续部署</span></h1>
            <p class="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
              实现了软件的构建发布部署流程的自动化；<br>
              自动化的流程提高了效率，实现了软件的快速发布； <br>
              自动化的流程避免了人为的失误，提高了软件发布的准确性；<br>
              自动化的流程能够尽早地发现问题，保证了软件功能的持续集成，而没有回退； <br>
              自动化的流程使得软件的发布可靠且可重复；<br>
            </p>
            <div class="flex mt-6 justify-start md:justify-center xl:justify-start">
              <a href="/devops/" class="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-Indigo-500 hover:bg-Indigo-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md">cicd和DevOps</a>
              <a href="/devops/dev-ops-skill/" class="ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md">技能自查表</a>
            </div>
          </div>
          <div class="mt-12 xl:mt-0 px-6 flex-shrink-0 hidden md:block">
            <image src="devops3.png" class="border-0 mx-auto" style="width: 40rem; height: 30rem;"></image>
          </div>
        </div>
      </div>

      </div>
    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon
  },

  metaInfo() {
    const title = 'Great Documentation starts here';
    const description = 'DOCC is a starter theme with instant search and dark mode for writing great technical documentation. Based on Gridsome!';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ]
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
