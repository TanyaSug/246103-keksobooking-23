export const getDataOffer = (data) => ({
  price: data.offer.price,
  avatar: data.author.avatar,
  title: data.offer.title,
  type: data.offer.type,
  description: data.offer.description,
  timein: data.offer.checkin,
  timeout: data.offer.checkout,
  address: data.offer.address,
  rooms: data.offer.rooms,
  capacity: data.offer.guests,
  images: data.offer.photos,
  features: data.offer.features,
});
