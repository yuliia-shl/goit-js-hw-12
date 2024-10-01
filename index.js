import{S as d,i as n}from"./assets/vendor-5ObWk2rO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const f=document.querySelector(".search-form"),m=document.querySelector(".search-input"),u=document.querySelector(".gallery"),a=document.querySelector(".loader"),h="46159699-3637bafd8e7308a1e0528cb6d",p="https://pixabay.com/api/";let c=new d(".gallery a",{captionsData:"alt",captionDelay:250});f.addEventListener("submit",i=>{i.preventDefault();const s=m.value.trim();if(s===""){n.warning({message:"Please fill this field",position:"topRight"});return}g(s)});function g(i){a.classList.remove("hidden"),u.innerHTML="",c.refresh();const s=`${p}?key=${h}&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(s).then(e=>{if(!e.ok)throw new Error(`HTTP error! статус: ${e.status}`);return e.json()}).then(e=>{e.hits.length===0?(n.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.classList.add("hidden")):(y(e.hits),c.refresh(),a.classList.add("hidden"),m.value="")}).catch(e=>{console.error("Помилка:",e),n.error({message:"Something went wrong! Please try again later.",position:"topRight"})})}function y(i){const s=i.map(e=>`
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

      </li> `).join("");u.insertAdjacentHTML("beforeend",s)}
//# sourceMappingURL=index.js.map
