import Vue from "vue";
import { commentOptions } from "./define";
import Valine from "@Valine";

export default Vue.extend({
  name: "Comment",

  components: { Valine },

  data: () => ({
    options: commentOptions,
  }),

  computed: {
    pluginEnable(): boolean {
      return (
        this.options.type !== "disable" &&
        (this.$frontmatter.comment ||
          (this.options.comment !== false &&
            (this.options.type === "valine" ||
              this.$frontmatter.comment !== false)))
      );
    },
  },
});
