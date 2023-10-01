type RoutesPaths = Record<
  string,
  {
    path: string;
    getPathWithQuery?: (...args: Array<string>) => string;
  }
>;

const routesPaths: RoutesPaths = {
  search: {
    path: "/search",
    getPathWithQuery: function (page, query) {
      const path = this.path + "/" + Number(page) ? page : "";

      if (query) {
        return path + "?query=" + query;
      }

      return path;
    },
  },
  myList: {
    path: "my-list",
  },
};

export default routesPaths;
