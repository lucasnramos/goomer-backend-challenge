export default class Restaurant {
  id?: string;
  name: string;
  address: string;
  businessHours: string;
  pictureUrl: string;

  constructor(
    { name, address, businessHours, pictureUrl }: Restaurant,
    id?: string
  ) {
    this.name = name;
    this.address = address;
    this.businessHours = businessHours;
    this.pictureUrl = pictureUrl;
    this.id = id;
  }
}
