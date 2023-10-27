import { Header } from "./components/Header";
import { TemplateContent } from "./components/TemplateContent";
import { TemplateItem } from "./components/TemplateItem";

const templates = [
  { id: 1, title: "test" },
  { id: 2, title: "hello" },
  { id: 3, title: "why" },
  { id: 4, title: "testtesttesttest" },
  { id: 5, title: "mean" },
  { id: 6, title: "sorry" },
  { id: 7, title: "cool" },
  { id: 8, title: "bad" },
];

function App() {
  return (
    <div className="w-[700px] h-[400px] bg-white">
      {/* Header */}
      <Header />
      {/* Dashboard */}
      <main className="w-full">
        <div className="flex mx-6 py-3">
          <div className="w-[45%] h-[315px] overflow-scroll">
            <ul className="mr-2">
              {templates.map((template) => (
                <li className="h-10" key={template.id}>
                  <TemplateItem title={template.title} />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[55%] h-[315px] border rounded-md">
            <TemplateContent />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
