export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export type Topic = {
  id: string;
  title: string;
  titleRu: string;
  icon: string;
  summary: string;
  theory: string;
  youtubeId?: string;
  practice: string[];
  quiz: QuizQuestion[];
};

export type Subject = {
  id: string;
  name: string;
  topics: Topic[];
};

export type Grade = {
  grade: number;
  description: string;
  subjects: Subject[];
};

export const CURRICULUM: Grade[] = [
  {
    grade: 7,
    description: "Foundation: powers, polynomials, geometry basics",
    subjects: [
      {
        id: "g7-algebra",
        name: "Algebra",
        topics: [
          {
            id: "g7-powers",
            title: "Powers and exponents",
            titleRu: "Степени и показатели",
            icon: "x^n",
            summary: "Rules of exponents and operations on powers.",
            theory:
              "A power $a^n$ means multiplying $a$ by itself $n$ times. Core rules: $a^m \\cdot a^n = a^{m+n}$, $\\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^0 = 1$ for $a \\neq 0$, and $a^{-n} = \\frac{1}{a^n}$.",
            youtubeId: "NCV0LDdwCtY",
            practice: [
              "Simplify $2^3 \\cdot 2^4$",
              "Evaluate $\\frac{5^7}{5^4}$",
              "Simplify $(3^2)^3$",
            ],
            quiz: [
              {
                id: "q1",
                question: "Simplify $2^5 \\cdot 2^3$",
                options: ["$2^8$", "$2^{15}$", "$4^8$", "$2^2$"],
                correct: 0,
                explanation: "When multiplying powers with the same base, add the exponents: $5+3=8$.",
              },
              {
                id: "q2",
                question: "What is $(x^3)^4$?",
                options: ["$x^7$", "$x^{12}$", "$x^{-1}$", "$4x^3$"],
                correct: 1,
                explanation: "Power of a power: multiply exponents $3 \\cdot 4 = 12$.",
              },
              {
                id: "q3",
                question: "Evaluate $5^0$.",
                options: ["0", "1", "5", "undefined"],
                correct: 1,
                explanation: "Any non-zero base raised to power 0 equals 1.",
              },
              {
                id: "q4",
                question: "Simplify $\\frac{a^7}{a^2}$.",
                options: ["$a^5$", "$a^9$", "$a^{-5}$", "$a^{14}$"],
                correct: 0,
                explanation: "Dividing powers with the same base: subtract exponents $7-2=5$.",
              },
              {
                id: "q5",
                question: "Write $3^{-2}$ as a fraction.",
                options: ["$-9$", "$-6$", "$\\frac{1}{9}$", "$\\frac{1}{6}$"],
                correct: 2,
                explanation: "Negative exponent: $a^{-n} = \\frac{1}{a^n}$, so $3^{-2} = \\frac{1}{9}$.",
              },
            ],
          },
          {
            id: "g7-polynomials",
            title: "Polynomials",
            titleRu: "Многочлены",
            icon: "ax^2+bx+c",
            summary: "Addition, subtraction, multiplication, and identities.",
            theory:
              "A polynomial is an expression of the form $a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0$. Key identities: $(a+b)^2 = a^2 + 2ab + b^2$, $(a-b)^2 = a^2 - 2ab + b^2$, and $a^2 - b^2 = (a-b)(a+b)$.",
            youtubeId: "Vm7H0VTlrwg",
            practice: [
              "Expand $(x+3)^2$",
              "Factor $x^2 - 16$",
              "Multiply $(x+2)(x-5)$",
            ],
            quiz: [
              {
                id: "q1",
                question: "Expand $(x+4)^2$.",
                options: ["$x^2 + 16$", "$x^2 + 8x + 16$", "$x^2 + 4x + 16$", "$x^2 + 8x$"],
                correct: 1,
                explanation: "$(a+b)^2 = a^2 + 2ab + b^2$, so $(x+4)^2 = x^2 + 8x + 16$.",
              },
              {
                id: "q2",
                question: "Factor $x^2 - 25$.",
                options: ["$(x-5)^2$", "$(x+5)^2$", "$(x-5)(x+5)$", "Cannot be factored"],
                correct: 2,
                explanation: "Difference of squares: $a^2 - b^2 = (a-b)(a+b)$.",
              },
              {
                id: "q3",
                question: "Multiply $(x+3)(x-2)$.",
                options: ["$x^2 + x - 6$", "$x^2 - x - 6$", "$x^2 + 5x - 6$", "$x^2 - 6$"],
                correct: 0,
                explanation: "FOIL: $x^2 - 2x + 3x - 6 = x^2 + x - 6$.",
              },
              {
                id: "q4",
                question: "What is the degree of $4x^3 - 2x^5 + x$?",
                options: ["3", "5", "1", "9"],
                correct: 1,
                explanation: "Degree is the highest exponent: 5.",
              },
              {
                id: "q5",
                question: "Expand $(2x - 1)^2$.",
                options: ["$4x^2 + 1$", "$4x^2 - 4x + 1$", "$4x^2 - 2x + 1$", "$2x^2 - 2x + 1$"],
                correct: 1,
                explanation: "$(2x-1)^2 = 4x^2 - 4x + 1$.",
              },
            ],
          },
        ],
      },
      {
        id: "g7-geometry",
        name: "Geometry",
        topics: [
          {
            id: "g7-triangles",
            title: "Triangles",
            titleRu: "Треугольники",
            icon: "\\triangle",
            summary: "Properties, congruence, and angle sums.",
            theory:
              "The sum of interior angles of any triangle equals $180°$. A triangle is equilateral if all sides are equal, isosceles if two sides are equal, scalene if all sides differ. Congruence criteria: SSS, SAS, ASA.",
            youtubeId: "MEjLnNcv8jw",
            practice: [
              "Find the third angle of a triangle with angles 50° and 70°.",
              "Classify a triangle with sides 5, 5, 8.",
              "Are triangles with sides (3,4,5) and (6,8,10) similar?",
            ],
            quiz: [
              {
                id: "q1",
                question: "What is the sum of interior angles of a triangle?",
                options: ["90°", "180°", "270°", "360°"],
                correct: 1,
                explanation: "The interior angles of any triangle sum to $180°$.",
              },
              {
                id: "q2",
                question: "If two angles are 40° and 75°, what is the third?",
                options: ["55°", "65°", "75°", "85°"],
                correct: 1,
                explanation: "$180° - 40° - 75° = 65°$.",
              },
              {
                id: "q3",
                question: "A triangle with all sides equal is called:",
                options: ["Isosceles", "Scalene", "Equilateral", "Right"],
                correct: 2,
                explanation: "Equilateral = all sides (and angles) equal.",
              },
              {
                id: "q4",
                question: "Which is NOT a congruence criterion?",
                options: ["SSS", "SAS", "AAA", "ASA"],
                correct: 2,
                explanation: "AAA only gives similarity, not congruence.",
              },
              {
                id: "q5",
                question: "An isosceles triangle has angles 70°, 70°, ?",
                options: ["40°", "70°", "110°", "30°"],
                correct: 0,
                explanation: "$180° - 70° - 70° = 40°$.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 8,
    description: "Quadratic functions, Pythagorean theorem, coordinates",
    subjects: [
      {
        id: "g8-algebra",
        name: "Algebra",
        topics: [
          {
            id: "g8-quadratic",
            title: "Quadratic equations",
            titleRu: "Квадратные уравнения",
            icon: "ax^2+bx+c=0",
            summary: "Solving via factoring and the quadratic formula.",
            theory:
              "A quadratic equation has the form $ax^2 + bx + c = 0$ where $a \\neq 0$. The quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. The discriminant $D = b^2 - 4ac$ determines the number of real roots: $D>0$ two roots, $D=0$ one root, $D<0$ no real roots.",
            youtubeId: "i7idZfS8t8w",
            practice: [
              "Solve $x^2 - 5x + 6 = 0$",
              "Solve $2x^2 + 3x - 2 = 0$ using the formula",
              "Find the discriminant of $x^2 + 4x + 5$",
            ],
            quiz: [
              {
                id: "q1",
                question: "Solve $x^2 - 9 = 0$.",
                options: ["$x = 3$ only", "$x = \\pm 3$", "$x = \\pm 9$", "No solution"],
                correct: 1,
                explanation: "$x^2 = 9 \\Rightarrow x = \\pm 3$.",
              },
              {
                id: "q2",
                question: "What is the discriminant of $x^2 + 2x + 1$?",
                options: ["0", "4", "-4", "8"],
                correct: 0,
                explanation: "$D = b^2 - 4ac = 4 - 4 = 0$.",
              },
              {
                id: "q3",
                question: "Solve $x^2 - 5x + 6 = 0$.",
                options: ["$x = 2, 3$", "$x = -2, -3$", "$x = 1, 6$", "$x = 5, 6$"],
                correct: 0,
                explanation: "Factor: $(x-2)(x-3)=0$.",
              },
              {
                id: "q4",
                question: "If $D < 0$, the equation has:",
                options: ["Two real roots", "One real root", "No real roots", "Infinite roots"],
                correct: 2,
                explanation: "Negative discriminant means no real solutions.",
              },
              {
                id: "q5",
                question: "Sum of roots of $x^2 - 7x + 12 = 0$ (Vieta).",
                options: ["7", "-7", "12", "-12"],
                correct: 0,
                explanation: "By Vieta: sum $= -b/a = 7$.",
              },
            ],
          },
          {
            id: "g8-pythagoras",
            title: "Pythagorean theorem",
            titleRu: "Теорема Пифагора",
            icon: "a^2+b^2=c^2",
            summary: "Relates the sides of a right triangle.",
            theory:
              "For a right triangle with legs $a, b$ and hypotenuse $c$: $a^2 + b^2 = c^2$. Common Pythagorean triples: $(3,4,5)$, $(5,12,13)$, $(8,15,17)$.",
            youtubeId: "AA6RfgP-AHU",
            practice: [
              "Find the hypotenuse if legs are 6 and 8.",
              "Find a leg if hypotenuse is 13 and one leg is 5.",
              "Is (7, 24, 25) a Pythagorean triple?",
            ],
            quiz: [
              {
                id: "q1",
                question: "Legs are 3 and 4. Hypotenuse?",
                options: ["5", "7", "6", "$\\sqrt{12}$"],
                correct: 0,
                explanation: "$\\sqrt{9+16} = \\sqrt{25} = 5$.",
              },
              {
                id: "q2",
                question: "Hypotenuse is 13, one leg is 12. Other leg?",
                options: ["1", "5", "11", "25"],
                correct: 1,
                explanation: "$\\sqrt{169 - 144} = \\sqrt{25} = 5$.",
              },
              {
                id: "q3",
                question: "Is (8, 15, 17) a Pythagorean triple?",
                options: ["Yes", "No"],
                correct: 0,
                explanation: "$64 + 225 = 289 = 17^2$.",
              },
              {
                id: "q4",
                question: "Diagonal of a square with side 1?",
                options: ["1", "$\\sqrt{2}$", "2", "$\\sqrt{3}$"],
                correct: 1,
                explanation: "$\\sqrt{1+1} = \\sqrt{2}$.",
              },
              {
                id: "q5",
                question: "Legs 5 and 12. Hypotenuse?",
                options: ["13", "17", "$\\sqrt{60}$", "10"],
                correct: 0,
                explanation: "$\\sqrt{25+144} = \\sqrt{169} = 13$.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 9,
    description: "Trigonometry, exponential & logarithmic functions",
    subjects: [
      {
        id: "g9-algebra",
        name: "Algebra",
        topics: [
          {
            id: "g9-trig",
            title: "Trigonometry basics",
            titleRu: "Основы тригонометрии",
            icon: "\\sin\\theta",
            summary: "Sine, cosine, tangent and identities.",
            theory:
              "In a right triangle with angle $\\theta$: $\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}$, $\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$, $\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$. Pythagorean identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.",
            youtubeId: "PUB0TaZ7bhA",
            practice: [
              "Compute $\\sin 30°$, $\\cos 60°$, $\\tan 45°$.",
              "Prove $\\sin^2 60° + \\cos^2 60° = 1$.",
              "Find $\\sin\\theta$ if $\\cos\\theta = \\frac{3}{5}$ and $\\theta$ is acute.",
            ],
            quiz: [
              {
                id: "q1",
                question: "What is $\\sin 30°$?",
                options: ["$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "1"],
                correct: 0,
                explanation: "Standard value: $\\sin 30° = 1/2$.",
              },
              {
                id: "q2",
                question: "Value of $\\cos 0°$?",
                options: ["0", "1", "-1", "Undefined"],
                correct: 1,
                explanation: "$\\cos 0° = 1$.",
              },
              {
                id: "q3",
                question: "If $\\sin\\theta = 0.6$ and $\\theta$ is acute, $\\cos\\theta = ?$",
                options: ["0.4", "0.6", "0.8", "1"],
                correct: 2,
                explanation: "Using $\\sin^2 + \\cos^2 = 1$: $\\cos = \\sqrt{1-0.36} = 0.8$.",
              },
              {
                id: "q4",
                question: "$\\tan 45°$ equals:",
                options: ["0", "1", "$\\sqrt{2}$", "Undefined"],
                correct: 1,
                explanation: "$\\sin 45° = \\cos 45°$, so $\\tan = 1$.",
              },
              {
                id: "q5",
                question: "Simplify $\\sin^2 x + \\cos^2 x$.",
                options: ["0", "1", "$2\\sin x$", "$\\tan x$"],
                correct: 1,
                explanation: "Pythagorean identity equals 1.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 10,
    description: "Limits, derivatives, 3D geometry",
    subjects: [
      {
        id: "g10-calculus",
        name: "Calculus",
        topics: [
          {
            id: "g10-derivatives",
            title: "Derivatives",
            titleRu: "Производные",
            icon: "\\frac{d}{dx}",
            summary: "Power rule and basic differentiation.",
            theory:
              "The derivative measures rate of change. Power rule: $\\frac{d}{dx} x^n = n x^{n-1}$. Sum rule: $(f+g)' = f' + g'$. Constant rule: $\\frac{d}{dx} c = 0$. The derivative gives the slope of the tangent line.",
            youtubeId: "5yfh5cf4-0w",
            practice: [
              "Differentiate $f(x) = 3x^4 + 2x^2 - 7$",
              "Find $f'(x)$ for $f(x) = x^3 - 5x$",
              "Slope of tangent to $y = x^2$ at $x = 3$",
            ],
            quiz: [
              {
                id: "q1",
                question: "Derivative of $f(x) = 3x^4 + 2x^2$.",
                options: ["$12x^3 + 4x$", "$12x^3 + 2x$", "$3x^3 + 2x$", "$12x^4 + 4x^2$"],
                correct: 0,
                explanation: "Power rule on each term: $4 \\cdot 3 x^3 + 2 \\cdot 2 x = 12x^3 + 4x$.",
              },
              {
                id: "q2",
                question: "$\\frac{d}{dx}(7)$ equals:",
                options: ["7", "0", "$x$", "$7x$"],
                correct: 1,
                explanation: "Derivative of a constant is 0.",
              },
              {
                id: "q3",
                question: "Slope of $y = x^2$ at $x = 3$.",
                options: ["3", "6", "9", "12"],
                correct: 1,
                explanation: "$y' = 2x$, at $x=3$ slope $= 6$.",
              },
              {
                id: "q4",
                question: "Derivative of $x^5$.",
                options: ["$5x^4$", "$x^4$", "$5x^5$", "$\\frac{x^6}{6}$"],
                correct: 0,
                explanation: "Power rule: $5x^{5-1} = 5x^4$.",
              },
              {
                id: "q5",
                question: "Derivative of $f(x) = x^3 - 4x + 1$.",
                options: ["$3x^2 - 4$", "$3x^2 - 4x$", "$x^2 - 4$", "$3x^2 + 1$"],
                correct: 0,
                explanation: "Term-by-term: $3x^2 - 4 + 0$.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    description: "Integrals, differential equations, statistics",
    subjects: [
      {
        id: "g11-calculus",
        name: "Calculus",
        topics: [
          {
            id: "g11-integrals",
            title: "Indefinite integrals",
            titleRu: "Неопределенные интегралы",
            icon: "\\int x\\,dx",
            summary: "Antiderivatives and the power rule for integration.",
            theory:
              "The indefinite integral is the antiderivative: $\\int f(x) dx = F(x) + C$ where $F'(x) = f(x)$. Power rule: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ for $n \\neq -1$. Linearity: $\\int (af + bg) dx = a\\int f dx + b\\int g dx$.",
            youtubeId: "rCWOdfQ3cwQ",
            practice: [
              "Compute $\\int x^3 dx$",
              "Compute $\\int (2x + 1) dx$",
              "Find $\\int (3x^2 - 4x + 5) dx$",
            ],
            quiz: [
              {
                id: "q1",
                question: "$\\int x^2 dx = ?$",
                options: ["$2x + C$", "$\\frac{x^3}{3} + C$", "$x^3 + C$", "$\\frac{x^2}{2} + C$"],
                correct: 1,
                explanation: "Power rule with $n=2$: $\\frac{x^3}{3} + C$.",
              },
              {
                id: "q2",
                question: "$\\int 5 dx = ?$",
                options: ["5", "$5x$", "$5x + C$", "0"],
                correct: 2,
                explanation: "Integral of a constant: $5x + C$.",
              },
              {
                id: "q3",
                question: "$\\int (2x + 3) dx = ?$",
                options: ["$x^2 + 3x + C$", "$2x^2 + 3x$", "$x^2 + 3 + C$", "$2 + C$"],
                correct: 0,
                explanation: "$\\int 2x dx = x^2$, $\\int 3 dx = 3x$.",
              },
              {
                id: "q4",
                question: "$\\int x^{-2} dx = ?$",
                options: ["$\\frac{1}{x} + C$", "$-\\frac{1}{x} + C$", "$\\ln x + C$", "$-x^{-3} + C$"],
                correct: 1,
                explanation: "$\\int x^{-2} dx = \\frac{x^{-1}}{-1} + C = -\\frac{1}{x} + C$.",
              },
              {
                id: "q5",
                question: "Antiderivative of $f(x) = 6x$.",
                options: ["$3x^2 + C$", "$6 + C$", "$x^2 + C$", "$6x^2 + C$"],
                correct: 0,
                explanation: "$\\int 6x dx = 3x^2 + C$.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function findTopic(topicId: string): { topic: Topic; grade: number; subject: string } | null {
  for (const grade of CURRICULUM) {
    for (const subject of grade.subjects) {
      const topic = subject.topics.find((t) => t.id === topicId);
      if (topic) return { topic, grade: grade.grade, subject: subject.name };
    }
  }
  return null;
}

export function findGrade(grade: number): Grade | undefined {
  return CURRICULUM.find((g) => g.grade === grade);
}

export function allTopics(): Topic[] {
  return CURRICULUM.flatMap((g) => g.subjects.flatMap((s) => s.topics));
}
