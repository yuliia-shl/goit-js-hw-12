import{a as y,S as L,i as n}from"./assets/vendor-Rdv7LHNr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))u(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&u(h)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function u(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const w="46159699-3637bafd8e7308a1e0528cb6d",b="https://pixabay.com/api/";async function g(r,t){a.classList.remove("hidden");try{const e=await y.get(b,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});return{hits:e.data.hits,totalHits:e.data.totalHits}}catch(e){throw console.error("Request error:",e),e}}const p=document.querySelector(".gallery");let v=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){const t=r.map(e=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
            <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" width="360px" height="200px" />
        </a>

        <ul class="image-info">
          <li class="image-item">
            Likes
            <p class="image-name">${e.likes}</p>
          </li>
          <li class="image-item">
            Views
            <p class="image-name">${e.views}</p>
          </li>
          <li class="image-item">
            Comments
            <p class="image-name">${e.comments}</p>
          </li>
          <li class="image-item">
            Downloads
            <p class="image-name">${e.downloads}</p>
          </li>
        </ul>

      </li> `).join("");p.insertAdjacentHTML("beforeend",t),v.refresh()}function S(){p.innerHTML=""}const q=document.querySelector(".search-form"),R=document.querySelector(".search-input"),o=document.querySelector(".load-more-btn"),a=document.querySelector(".loader");let c="",d=1,l=0,m=0;q.addEventListener("submit",async r=>{if(r.preventDefault(),d=1,c=R.value.trim(),c===""){n.warning({message:"Please fill this field",position:"topRight"});return}S(),l=0;try{const{hits:t,totalHits:e}=await g(c,d);if(a.classList.add("hidden"),t.length===0){n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.classList.add("hidden"),o.classList.add("hidden");return}m=e,l+=t.length,f(t),o.classList.remove("hidden"),a.classList.add("hidden"),l>=m&&(o.classList.add("hidden"),a.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(t){console.error("Error during receiving images:",t),n.error({message:"Something went wrong! Please try again later.",position:"topRight"}),a.classList.add("hidden")}});o.addEventListener("click",async()=>{d+=1;try{o.classList.add("hidden");const{hits:r}=await g(c,d);l+=r.length,a.classList.add("hidden"),o.classList.remove("hidden"),f(r),l>=m&&(o.classList.add("hidden"),a.classList.add("hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:t}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}catch(r){console.error("Error loading additional images:",r)}});
//# sourceMappingURL=index.js.map
