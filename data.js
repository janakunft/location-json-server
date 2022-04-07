const { faker } = require("@faker-js/faker");
faker.setLocale("en_GB");

module.exports = () => {
  const data = {
    users: [],
  };
  for (let i = 0; i < 1000; i++) {
    const gender = faker.name.gender(true).toLowerCase();
    const firstname = faker.name.firstName(gender);
    const lastName = faker.name.lastName();
    const stageName = `${firstname} ${lastName}`;
    const createdAt = faker.date.between(new Date(2022, 2, 1), new Date());
    const updatedAt = faker.date.between(createdAt, new Date());
    const socialPlatforms = faker.random.arrayElements([
      "youtube",
      "instagram",
      "twitter",
      "twitch",
    ]);
    const socials = {};
    socialPlatforms.forEach((platform) => {
      const firstLast = `${firstname}${lastName}`.replace(/[^a-z0-9]/gi, "");
      switch (platform) {
        case "youtube":
          socials.youtube = `https://www.youtube.com/channel/${faker.random.alphaNumeric(
            24
          )}`;
          break;
        case "instagram":
          socials.instagram = firstLast.toLowerCase();
          break;
        case "twitter":
          socials.twitter = firstLast.substring(0, 14);
          break;
        case "twitch":
          socials.twitch = `https://www.twitch.tv/${firstLast.toLowerCase()}`;
          break;
      }
    });
    data.users.push({
      id: faker.datatype.uuid(),
      stageName: stageName,
      email: faker.internet.email(firstname, lastName),
      profileImage: `https://randomuser.me/api/portraits/${gender}/${faker.datatype.number(
        { min: 1, max: 96 }
      )}.jpg`,
      bio: faker.lorem.paragraph(),
      location: {
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        postcode: faker.address.zipCode(),
        latitude: faker.address.latitude(59.4, 49.9, 6),
        longitude: faker.address.longitude(2, -10.8, 6),
      },
      skills: faker.random.arrayElements(
        [
          "guitar",
          "vocals",
          "drums",
          "trumpet",
          "keyboard",
          "dancing",
          "saxophone",
          "songwriter",
          "piano",
          "sound engineering",
          "tambourine",
          "violin",
          "bass",
          "double-bass",
          "recorder",
          "flute",
          "ukulele",
          "other",
        ],
        faker.datatype.number({ min: 1, max: 4 })
      ),
      interests: faker.random.arrayElements(
        [
          "band member",
          "producing",
          "frontman",
          "sound engineer",
          "jam sessions",
          "form a band",
          "record songs",
        ],
        faker.datatype.number({ min: 1, max: 3 })
      ),
      createdAt: createdAt,
      updatedAt: updatedAt,
      socials: socials,
    });
  }
  return data;
};
