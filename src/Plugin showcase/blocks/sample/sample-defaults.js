const defaultControllers = {
  title: "",
  id: "",
  sampleOptions: [],
  data: [
    { title: "step" },
    {
      title: "type",
      type: "radio",
      data: [
        {
          label: "Single",
          value: "single",
          name: "type"
        },
        {
          label: "Range",
          value: "range",
          name: "type"
        }
      ]
    },
    {
      type: "group",
      title: "Values",
      data: [
        {title: "value"},
        {title: "minValue"},
        {title: "maxValue"},
      ]
    },
    {
      type: "group",
      title: "Limits",
      data: [
        {title: "minLimit"},
        {title: "maxLimit"},
      ]
    },
    {title: "roots"},
    {
      title: "direction",
      type: "radio",
      data: [
        {
          label: "Horizontal",
          value: "horizontal",
          name: "direction"
        },
        {
          label: "Vertical",
          value: "vertical",
          name: "direction"
        }
      ]
    },
    {title: "valueNoteDisplay", type: "checkbox"},
    {title: "divisionsCount"}
  ]
};

export default defaults;
