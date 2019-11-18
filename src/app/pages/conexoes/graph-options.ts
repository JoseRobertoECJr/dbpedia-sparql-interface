export const graphOptions = {
    nodes: {
        shape: "dot",
        size: 20,
        font: {
        size: 15,
        color: "gray"
        },
        borderWidth: 2
    },
    edges: {
        width: 2
    },
    groups: {
        literal: {
            shape: "icon",
            icon: {
                face: "FontAwesome",
                code: "\uf0c8",
                size: 50,
                color: "#cdd160"
            }
        }
    },
    // physics: {
    //     hierarchicalRepulsion: {
    //         centralGravity: 0.0,
    //         springLength: 100,
    //         springConstant: 0.001,
    //         nodeDistance: 100,
    //         damping: 0.09
    //     },
    //     solver: 'hierarchicalRepulsion'
    // }
}