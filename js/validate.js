function validate(event) {
  // TODO - write custom validation logic to validate the longitude and latitude
  // values. The latitude value must be a number between -90 and 90; the
  // longitude value must be a number between -180 and 180. If either/both are
  // invalid, show the appropriate error message in the form, and stop the 
  // form from being submitted. If both values are valid, allow the form to be
  // submitted.

let longToValidate = document.getElementById('longitude').value;
let latToValidate = document.getElementById('latitude').value;

if (longToValidate > 180 || longToValidate < -180)
{
  event.preventDefault();
  document.getElementById('longitudeLabel').innerHTML="* must be a valid Longitude (-180 to 180)"
}
if (latToValidate > 90 || latToValidate < -90)
{
  event.preventDefault();
  document.getElementById('latitudeLabel').innerHTML="* must be a valid Latitude (-90 to 90)"
}




}

// Wait for the window to load, then set up the submit event handler for the form.
window.onload = function() {
  const form = document.querySelector('form');
  form.onsubmit = validate;
};
