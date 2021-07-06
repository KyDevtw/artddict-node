class Auction {
  constructor(
    eventClass,
    eventId,
    eventName,
    eventDescription,
    eventDateStart,
    eventDateEnd,
    eventPrice,
    eventImg,
    eventCity,
    museumId,
    cityName
  ) {
    this.id = 0;
    this.eventClass = eventClass;
    this.eventId = eventId;
    this.eventName = eventName;
    this.eventDescription = eventDescription;
    this.eventDateStart = eventDateStart;
    this.eventDateEnd = eventDateEnd;
    this.eventPrice = eventPrice;
    this.eventImg = eventImg;
    this.eventCity = eventCity;
    this.museumId = museumId;
    this.cityName = cityName;
  }

module.exports = Auction;
