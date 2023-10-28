import Handlebars from "handlebars";

export default function handlebars() {
  const regex = /\.hbs$|\.handlebars$/;

  return {
    name: "vite-plugin-handlebars-precompile",
    transform(src: string, id: string) {
      if (!regex.test(id)) return;

      const code = `
        import Handlebars from 'handlebars/runtime';

        export default Handlebars.template(${Handlebars.precompile(src)})
      `;

      return {
        code,
      };
    },
  };
}
