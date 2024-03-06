import queryString from "query-string";
import { Plugin } from "../types/Plugin";

export const fetchPlugin = async (input: string): Promise<Plugin | null> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    try {
      if (input.includes("github.com")) {
        // the provided a github.com link
        const url = input.replace(
          "https://github.com/",
          "https://api.github.com/repos/"
        );
        const resp = await fetch(url);
        const data = await resp.json();
        if (data && data.has_pages) {
          const homepage = data.homepage;
          const [creator, name] = data.full_name.split("/");
          resolve({ name, creator, versions: ["1.0.0"], url: homepage });
        } else {
          throw new Error("");
        }
      } else if (input.includes("remoteEntry.js")) {
        const [_url, query] = input.split("?");
        const { name, creator, v } = queryString.parse(query);
        if (name) {
          resolve({
            name: name as string,
            creator: creator as string,
            versions: [v as string],
            url: _url.replace("remoteEntry.js", ""),
          });
        } else throw new Error("");
      } else {
        throw new Error("");
      }
    } catch (e) {
      alert("Cound not add plugin, invalid url or repo provided.");
      console.error(e);
      resolve(null);
    }
  });
};
