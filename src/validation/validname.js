export default function validname(event) {
  const inputValue = event.target.value;
  const errorElement = document.getElementById("M");

  if (!errorElement) {
    console.warn("Element with ID 'M' not found.");
    return;
  }

  if (/[^a-zA-Z\s]/.test(inputValue)) {
    errorElement.innerHTML = "Please enter valid letters only.";
  } else {
    errorElement.innerHTML = "";
  }
}
