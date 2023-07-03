const { getStoryContext } = require("@storybook/test-runner");
const { MINIMAL_VIEWPORTS } = require("@storybook/addon-viewport");

const DEFAULT_VP_SIZE = { width: 1280, height: 720 };

module.exports = {
  async preRender(page, story) {
    const context = await getStoryContext(page, story);
    const vpName = context.parameters?.viewport?.defaultViewport;
    const vpParams = MINIMAL_VIEWPORTS[vpName];

    if (vpParams) {
      const vpSize = Object.entries(vpParams.styles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          [screen]: parseInt(size),
        }),
        {}
      );

      page.setViewportSize(vpSize);
    } else {
      page.setViewportSize(DEFAULT_VP_SIZE);
    }
  },
};
