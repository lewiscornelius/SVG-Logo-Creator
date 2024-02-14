import inquirer from "inquirer";
const SVG = require("./svg");
const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class CLI {
    run() {
        return inquirer
        .prompt([
            {
                name: "text",
                type: "input",
                message:
                "Enter the text you want to display (leave empty to display a random text)",
                validate: (text) =>
                text.length <= 3 ||
                "The message must not have more than 3 characters",
            },
            {
                name: "textColor",
                type: "input",
                message: "Enter a text color",
            },
            {
                name: "shapeType",
                type: "list",
                choices: ["Circle", "Triangle", "Square"],
                message: "Choose a shape",
            },
            {
                name: "shapeColor",
                type: "input",
                message: "Enter a color for your shape:"
            },
        ])
        .then(({ text, textColor, shapeType, shapeColor }) => {
            let shape;
            switch (shapeType) {
                case "circle":
                    shape = new Circle();
                    break;

                case "square":
                    shape = new Square();
                    break;
                
                default:
                    shape = new Triangle();
                    break;
            }
            shape.setColor(shapeColor);

            const svg = new SVG();
            svg.setText(text, textColor);
            svg.setShape(shape);
            return writeFile("loho.svg", svg.render());
        })
        .then(() => {
            console.log("Generated logo.svg");
        })
        .catch((error) => {
            console.log(error);
            console.log("Oops! Something went wrong.");
          });
    }
}

module.exports = CLI;