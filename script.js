"use strict";
// obtaining the values from the html file
let selectElement = document.getElementById("quiz-categories");
var userName = document.getElementById("name_of_player");

// export { userName };

//linking the api to the category selection
fetch("https://opentdb.com/api_category.php")
  .then(function (response) {
    if (response.ok) {
      //   console.log("you got in");
      return response.json();
    } else {
      throw new Error("Network response was not ok.");
    }
  })
  .then(function (data) {
    // Retrieve the list of categories from the API response
    let categories = data.trivia_categories;

    console.log(categories);

    // Populate the select options with the categories
    categories.forEach(function (category) {
      let option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectElement.appendChild(option);
      option.style.backgroundColor = "#b3f9ef";
      option.style.color = "black";
    });
  })
  .catch(function (error) {
    console.error(error);
  });

//   adding event listner to the seleceElement
selectElement.addEventListener("change", function () {
  let selectedCategoryId = selectElement.value;
  //   console.log(selectElement);
  //   console.log(selectedCategoryId);

  // directing the webpage to the quiz of that particular category
  let play = document.getElementById("play_button");
  play.addEventListener("click", function () {
    window.location.assign("quiz.html?category=" + selectedCategoryId);
  });
  //   window.location.assign("quiz.html?category=" + selectedCategoryId);
});

console.log("redirecting to the quiz page");
