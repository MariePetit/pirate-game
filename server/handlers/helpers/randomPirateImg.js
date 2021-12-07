const pirateImages = [
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/004-pirate-3.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/005-pirate-hat.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/006-pirate-4.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/007-pirate-5.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/008-pirate-6.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/009-pirate-7.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/010-pirate-8.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/011-pirate-9.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/012-pirate-10.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/013-pirate-11.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/014-pirate-12.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/015-pirate-13.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/016-pirate-14.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/017-pirate-15.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/018-pirate-16.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/019-pirate-17.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/020-pirate-18.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/021-pirate-19.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/022-pirate-20.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/023-pirate-21.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/024-pirate-22.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/025-pirate-23.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/026-pirate-24.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/027-pirate-25.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/028-pirate-26.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/029-pirate-27.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/030-pirate-28.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/031-pirate-29.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/032-pirate-30.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/1-pirate.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/2-pirate.png",
  "https://nicolas-bucket-recipe-app-images.s3.us-east-2.amazonaws.com/Pirate-looter-icons/Pirate-Icons/3-pirate.png",
];

const randomPirateImage = () => {
  return pirateImages[Math.floor(Math.random() * pirateImages.length)];
};

module.exports = { randomPirateImage };
