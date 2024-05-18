let data;

const handleCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  let data = await response.json();
  console.log(data.data);

  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <a onclick="loadVideos('${category.category_id}')" class="tab bg-gray-300 rounded-md hover:bg-[#FF1F3D] text-black hover:text-white">${category.category}</a>
        
        `;

    tabContainer.appendChild(div);
  });
};

const loadVideos = async (categoryId) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const response = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${categoryId}
    `);

  data = await response.json();

  // If any category is missing
  let noContent = document.getElementById("no-content");
  if (data.data.length === 0) {
    noContent.classList.remove("hidden");
    noContent.classList.add("block");
  } else {
    noContent.classList.remove("block");
    data.data?.forEach((videos) => {
      console.log(videos);
      const div = document.createElement("div");
      div.innerHTML = `
   
              <div class="bg-base-100  shadow-lg px-4 py-5 border">
                  <div class="">
                    <img src="${
                      videos?.thumbnail
                    }" alt="Videos" class="rounded-xl w-full h-[200px]" />
                  </div>
                  <div class="flex space-x-4 mt-4">
                      <div>
                          <div class="avatar">
                              <div class="w-12 rounded-full">
                                  <img src="${
                                    videos?.authors[0]?.profile_picture
                                  }" />
                              </div>
                          </div>
                      </div>
                      
                      <div class="flex flex-col space-y-2">
                          <div class="text-base text-black font-bold">
                              <h2 class="text-xl">${videos?.title}</h2>
                          </div>
                          <div class="flex space-x-4 items-center">
                              <h4>${videos?.authors[0]?.profile_name}</h4>
                              <div>
                                  ${
                                      videos?.authors[0]?.verified ? 
                                      '<div class="avatar"><div class="w-4"><img src="https://i.ibb.co/mFRvb6t/quality.png" /></div></div>'
                                        :
                                        ""
                                  }
                              </div>
                          </div>
                          <div class="">
                              <h4><span>${
                                videos?.others?.views
                              }</span> views</h4>
                          </div>
                      </div>                    
                  </div>               
              </div>
          `;

      cardContainer.appendChild(div);
    });
  }
};

function sortByView() {
  console.log("clicked from sort func");
  // Sort data based on views
  const sortedData = data.data.sort((a, b) => {
    const viewsA = parseInt(a.others?.views) || 0;
    const viewsB = parseInt(b.others?.views) || 0;
    return viewsB - viewsA;
  });

  console.log(sortedData);

  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";
  data.data?.forEach((videos) => {
    console.log(videos);
    const div = document.createElement("div");
    div.innerHTML = `
 
            <div class=bg-base-100  shadow-lg px-4 py-5">
                <div >
                  <img src="${
                    videos?.thumbnail
                  }" alt="Videos" class="rounded-xl w-full h-[200px]" />
                </div>
                <div class="flex space-x-4 mt-4">
                    <div>
                        <div class="avatar">
                            <div class="w-12 rounded-full">
                                <img src="${
                                  videos?.authors[0]?.profile_picture
                                }" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex flex-col space-y-2">
                        <div class="text-base text-black font-bold">
                            <h2 class="text-xl">${videos?.title}</h2>
                        </div>
                        <div class="flex space-x-4 items-center">
                            <h4>${videos?.authors[0]?.profile_name}</h4>
                            <div>
                                
                                    ${
                                      videos?.authors[0]?.verified
                                        ? '<div class="avatar"><div class="w-4"><img src="https://i.ibb.co/mFRvb6t/quality.png" /></div></div>'
                                        : ""
                                    }
                                
                            </div>
                        </div>
                        <div class="">
                            <h4><span>${videos?.others?.views}</span> views</h4>
                        </div>

                    </div>
            
                    
                </div>
                
            </div>

        `;

    cardContainer.appendChild(div);
  });
}

document.getElementById("blog").addEventListener("click", function () {
  window.location.href = "blog.html";
});

handleCategory();
loadVideos("1000");
