module.exports = {
  moduleFileExtensions: ["ts", "tsx", "jsx", "js"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jestSetupFile.js"],
  modulePaths: ["<rootDir>/src"],
  moduleDirectories: ["src", "node_modules"],
  modulePathIgnorePatterns: ["build", "storybook-static"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",

    "^Assets(.*)$": "<rootDir>/src/assets$1",
    "^Constants(.*)$": "<rootDir>/src/constants$1",
    "^Components(.*)$": "<rootDir>/src/interface/components$1",
    "^Composites(.*)$": "<rootDir>/src/interface/composites$1",
    "^Pages(.*)$": "<rootDir>/src/interface/pages$1",
    "^Structures(.*)$": "<rootDir>/src/interface/structures$1",
    "^Navigation(.*)$": "<rootDir>/src/navigation$1",
    "^Types(.*)$": "<rootDir>/src/types$1",
    "^Slices(.*)$": "<rootDir>/src/redux/slices$1",
    "^Actions(.*)$": "<rootDir>/src/redux/actions$1",
  },
  transformIgnorePatterns: ["/node_modules/(?!react-file-drop)"],
  transform: {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
  testPathIgnorePatterns: ["\\.snap$", "\\.sass$", "<rootDir>/node_modules/"],
  cacheDirectory: ".jest/cache",
  globals: {
    "ts-jest": {
      babel: true,
      tsconfig: "tsconfig.json",
    },
  },
};
