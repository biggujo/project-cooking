import{n as c,R as h,c as C,h as L,s as E}from"./scroll-up-31a6c420.js";const d="All categories",n=12;let p=1;const i={favoritesCategories:document.querySelector(".fav-categories"),favoritesList:document.getElementById("rendered-cards-for-favourites")};i.favoritesCategories.addEventListener("click",S);i.favoritesList.addEventListener("click",A);N();function N(){P()?v():R()}function S({target:e}){if(e.nodeName!=="BUTTON")return;const t=e.dataset.category;b(),I(t),u(),l({givenCategory:t}).catch(c.Notify.failure).finally(()=>g())}function A({target:e}){e.nodeName!=="svg"&&e.nodeName!=="use"||(u(),l({givenCategory:e.textContent}).then(t=>{y(t),g()}))}function R(){u(),l({page:p}).then(e=>{y(e),g()}).catch(c.Notify.failure)}async function l({givenCategory:e,page:t}){try{const r=JSON.parse(localStorage.getItem("favorites"));i.favoritesList.innerHTML="";const m=r.map(o=>new h().init(o));let s=await Promise.all(m),a=s;return e&&e!==d&&(t&&(s=s.slice(t*n,(t+1)*n)),a=s.filter(o=>o.recipeData.category===e)),document.getElementById("pagination").style.display=a.length>n?"block":"none",a.length>n&&(document.getElementById("pagination").style.display="block",t||(t=1),t===1&&C({totalItems:a.length,itemsPerPage:n,afterMove:o=>{l({givenCategory:e,page:o.page})}})),t&&(a=a.slice((t-1)*n,t*n)),a=new Set(a.map(o=>{const f=document.createElement("li");return f.classList.add("fav-categories-item"),f.appendChild(o.recipeCardEl),i.favoritesList.appendChild(f),o.recipeData.category})),a}catch(r){c.Notify.failure(r)}}function y(e){i.favoritesCategories.innerHTML="",(e===null||e.size===0)&&v(),t(d),[...e].sort().forEach(t);function t(r){i.favoritesCategories.insertAdjacentHTML("beforeend",`<button data-category='${r}' class='button-fav-category${r===d?" button-fav-category-active":""}'>${r}</button>`)}}function b(){i.favoritesCategories.querySelectorAll("[data-category]").forEach(t=>t.classList.remove("button-fav-category-active"))}function I(e){i.favoritesCategories.querySelector(`[data-category="${e}"]`).classList.add("button-fav-category-active")}function u(){i.favoritesList.style.height=i.favoritesList.offsetHeight+"px"}function g(){i.favoritesList.style.height="auto"}function P(){try{const e=JSON.parse(localStorage.getItem("favorites"));return e===null||e.length===0}catch(e){c.Notify.failure(e)}}function v(){document.querySelector(".fav-no-recipes").classList.remove("is-hidden"),document.querySelector(".fav-categories-container").style.display="none"}L();E();