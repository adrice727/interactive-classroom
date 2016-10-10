// const createPublisher = () =>
//   new Promise((resolve, reject) => {
//     // TODO: Handle adding 'name' option to props
//     const props = callProperties;
//     // TODO: Figure out how to handle common vs package-specific options
//     const container = containers.publisher.camera || 'publisherContainer';
//     const publisher = OT.initPublisher(container, props, error => {
//       if (error) {
//         reject(error);
//       }
//       resolve(publisher);
//     });
//   });


// const publish = () => {
//   createPublisher()
//     .then((publisher) => {
//       publishers.camera = publisher;
//       session.publish(publisher);
//     })
//     .catch((error) => {
//       const errorMessage = error.code === 1010 ? 'Check your network connection' : error.message;
//       triggerEvent('error', errorMessage);
//     });
// };

const cameraProperties = {
  insertMode: 'append',
  width: '100%',
  height: '100%',
  showControls: false,
  fitMode: 'contain',
  style: {
    buttonDisplayMode: 'on',
    nameDisplayMode: 'on',
  },
};

module.exports = {
  cameraProperties,
}