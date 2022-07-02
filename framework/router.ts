export class Router {
    static init(defaultComponent: string) {
        // set up routing
        document.querySelectorAll("nav a").forEach(a => {
            const link = a as HTMLLinkElement;
            link.onclick = (e) => {
                e.preventDefault();
                history.pushState(null, null, link.href);
                const component = document.createElement(link.href.substring(link.href.lastIndexOf("/") + 1) + "-page");
                document.querySelector("main").innerHTML = "";
                document.querySelector("main").appendChild(component);
            }
        });

        let componentName = location.href.substring(location.href.lastIndexOf("/") + 1);
        componentName = componentName ? componentName + "-page": defaultComponent;
        document.querySelector("main").appendChild(document.createElement(componentName));
    }
}
