import type { NextConfig } from "next";
const { withGluestackUI } = require("@gluestack/ui-next-adapter");

const nextConfig: NextConfig = {
	/* config options here */
};

export default withGluestackUI(nextConfig);
