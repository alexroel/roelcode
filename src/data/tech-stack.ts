class TechStack {
  name: string;
  icon: string;
  textColor: string;
  bgColor: string;

  constructor(name: string, icon: string, textColor: string, bgColor: string) {
    this.name = name;
    this.icon = icon;
    this.textColor = textColor;
    this.bgColor = bgColor;
  }
}

export const techStacks = [
  new TechStack("HTML", "tech/html", "text-orange-500", "bg-orange-50"),
  new TechStack("CSS", "tech/css", "text-blue-500", "bg-blue-50"),
  new TechStack(
    "JavaScript",
    "tech/javascript",
    "text-yellow-500",
    "bg-yellow-50"
  ),
  new TechStack("Go", "tech/golang", "text-cyan-500", "bg-cyan-50"),
  new TechStack("Python", "tech/python", "text-blue-500", "bg-blue-50"),
  new TechStack("Flask", "tech/flask", "text-black", "bg-gray-100"),
  new TechStack("Java", "tech/java", "text-red-500", "bg-red-50"),
];
