require 'magnific-popup'

$('[data-toggle="gallery"]').magnificPopup
  delegate: 'a' # child items selector, by clicking on it popup will open
  mainClass: 'mfp-with-zoom'
  zoom:
    enabled: true # By default it's false, so don't forget to enable it

    duration: 300, # duration of the effect, in milliseconds
    easing: 'ease-in-out' # CSS transition easing function
  type: 'image'
  gallery:
    enabled: true
