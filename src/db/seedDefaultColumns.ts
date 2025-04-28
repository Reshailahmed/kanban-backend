import { Column } from "../models/Column";

const defaultColumns = [
  { id: "backlog", title: "Backlog", isDefault: true },
  { id: "todo", title: "To Do", isDefault: true },
  { id: "inprogress", title: "In Progress", isDefault: true },
  { id: "inreview", title: "In Review", isDefault: true },
  { id: "done", title: "Done", isDefault: true },
];

export async function seedDefaultColumns() {
  const count = await Column.countDocuments();

  if (count === 0) {
    await Column.insertMany(defaultColumns);
    console.log("✅ Default columns seeded into database.");
  } else {
    console.log("✅ Default columns already exist. No seeding needed.");
  }
}
