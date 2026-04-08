import type { NextConfig } from "next";
const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default withGluestackUI(nextConfig);
