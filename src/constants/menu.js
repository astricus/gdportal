const data = [
    {
        id: "nat_proj",
        icon: "iconsminds-spring",
        label: "menu.nat_proj",
        to: "#",
        item: "layers",
        isVisible: true,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.health",
                layer: "kamchatka:health_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.education",
                layer: "kamchatka:education_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.demography",
                layer: "kamchatka:demography_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.culture",
                layer: "kamchatka:culture_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.roads",
                layer: "kamchatka:road_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.city-objects",
                layer: "kamchatka:public_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.ecology",
                layer: "kamchatka:waste_facility_national_projects",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.science",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.enterpr",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.digital",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.labour",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.export",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.nat_proj.infrastructure",
                layer: "",
                item: "layer",
                isVisible: true,
                to: "#"
            }
        ]
    },
    {
        id: "economic_map",
        icon: "iconsminds-coins",
        label: "menu.economic_map",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.economic_map.investing",
                layer: "kamchatka:investment_zone_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.economic_map.budget",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    {
        id: "admin_map",
        icon: "iconsminds-the-white-house",
        label: "menu.admin_map",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.admin_map.munic",
                layer: "kamchatka:municipal_structure_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.admin_map.regions",
                layer: "kamchatka:district_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.admin_map.people-dens",
                layer: "kamchatka:district_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.admin_map.people-quan",
                layer: "kamchatka:district_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.admin_map.centres",
                layer: "kamchatka:city_main_view",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    {
        id: "social_map",
        icon: "iconsminds-mens",
        label: "menu.social_map",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.edu",
                layer: "kamchatka:education_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.medicine",
                layer: "kamchatka:health_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.culture",
                layer: "kamchatka:culture_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.social-sec",
                layer: "kamchatka:social_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.sport",
                layer: "kamchatka:sport_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.tourism",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.garbage",
                layer: "kamchatka:waste_facility_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.social_map.common",
                layer: "kamchatka:public_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    {
        id: "grad_docs",
        icon: "iconsminds-building",
        label: "menu.city_docs",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.city_docs.stp",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.city_docs.gp",
                layer: "kamchatka:functional_zone_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.city_docs.pzz",
                layer: "kamchatka:territorial_zone_view",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.city_docs.ppmit",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    {
        id: "ecologic_map",
        icon: "iconsminds-environmental-3",
        label: "menu.ecologic_map",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.ecologic_map.interest-places",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.ecologic_map.oopt",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.ecologic_map.zouit",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.ecologic_map.garbage",
                layer: "kamchatka:waste_facility_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    {
        id: "transport_map",
        icon: "iconsminds-car",
        label: "menu.transport_map",
        to: "#",
        item: "layers",
        isVisible: false,
        subs: [
            {
                icon: "simple-icon-plus",
                label: "menu.transport_map.uds",
                layer: "kamchatka:road_projects",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.transport_map.parking",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.transport_map.ot",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            },
            {
                icon: "simple-icon-plus",
                label: "menu.transport_map.bmd",
                layer: "",
                item: "layer",
                isVisible: false,
                to: "#"
            }
        ]
    },
    // {
    //     id: "blankpage",
    //     icon: "iconsminds-bucket",
    //     label: "menu.blank-page",
    //     to: "/app/blank-page"
    // }
];
export default data;
