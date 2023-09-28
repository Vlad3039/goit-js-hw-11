export function createGalleryMarkup(values, element) {
  const markup = values.hits
    .map(value => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = value;
      return `<div class="photo-card">      
       <div class="image-wrapper">
          <a href="${largeImageURL}">
           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
        </div>
        <div class="card">
        <div class="svg-icon">
      
          <p class="card-text">Likes</p>
          <p>${likes}</p>
          </div>
          <div class="svg-icon">

          <p class="card-text">Views</p>
          <p>${views}</p>
          </div>
          <div class="svg-icon">
       
          <p class="card-text">Coments</p>
          <p>${comments}</p>
          </div>
          <div class="svg-icon">
         
          <p class="card-text">Downloads</p>
          <p>${downloads}</p>
          </div>
        </div>      
      </div>`;
    })
    .join('');

  element.insertAdjacentHTML('beforeend', markup);
}
