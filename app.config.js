import 'dotenv/config';

// export default {
// 	extra: {
// 		BASEURL: process.env.EXPO_BASEURL,
// 	},
// }

export default {
  "expo": {
    "extra": {
      BASEURL: process.env.EXPO_BASEURL,
      "eas": {
        "projectId": "05d623a8-ff32-4a9a-979a-4f7db62ff7e9"
      }
    }
  }
}