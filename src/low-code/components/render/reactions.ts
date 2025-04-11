import { Form, onFieldReact } from "@formily/core";
import { Field } from "../../type";

type ReactionHandler = (
  field: Field,
  form: Form,
  validSign: { isValid: boolean }
) => void | Promise<void>;

interface TaskContext {
  isValid: boolean;
  cancel: () => void;
  run: () => void;
}

export class ReactionRegistry {
  constructor(private form: Form) {}

  task: Map<string, Set<TaskContext>> = new Map();

  createTask = (field: Field, handler: ReactionHandler): TaskContext => {
    const id = field.id;

    const task: TaskContext = {
      // 标记数据是否有效
      isValid: true,
      cancel: () => {
        this.task.get(id)?.delete(task);
        if (this.task.get(id)?.size === 0) {
          this.task.delete(id);
        }
        task.isValid = false;
      },
      run: () => {
        return handler(field, this.form, task);
      },
    };

    if (this.task.has(id)) {
      this.task.get(id)?.add(task);
    } else {
      this.task.set(id, new Set([task]));
    }

    return task;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _isPromise = (value: any): value is Promise<any> => {
    return (
      value !== null &&
      typeof value === "object" &&
      typeof value.then === "function"
    );
  };

  registerReaction(field: Field, handler: ReactionHandler) {
    const id = field.id;
    this.form.addEffects(id, () => {
      onFieldReact(id, () => {
        // pre task sign no valid
        const preTasks = this.task.get(id);
        if (preTasks) {
          preTasks.forEach((task) => {
            task.cancel();
          });
        }

        // const _handler = this.handlerWrapper(id, handler);
        const task = this.createTask(field, handler);
        const callback = task.run();

        if (this._isPromise(callback)) {
          callback.then(() => {
            task.cancel();
          });
          return;
        } else {
          task.cancel();
        }
      });
    });
  }
}
