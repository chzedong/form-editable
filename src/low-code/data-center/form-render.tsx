import { createContext, ReactNode, useContext, useReducer } from "react";
import registry from "./prepare";
import { Action, FormRenderState, RenderContextType } from "./render-type";
import { AppMeta } from "../type";

const initialState: FormRenderState = {
  registry,
  formLayout: [],
  fields: {},
  appMeta: {} as AppMeta,
  formValue: {},
  formMeta: { id: "" },
};

const RenderContext = createContext<RenderContextType | null>(null);

export const FormRenderProvider: React.FC<{
  children: ReactNode;
  appMeta: AppMeta;
}> = (props) => {
  const [renderState, dispatch] = useReducer(
    (state: FormRenderState, action: Action) => {
      switch (action.type) {

        case "COMMON":
          return {
            ...state,
            ...action.payload,
          };
        default:
          return state;
      }
    },
    { ...initialState, appMeta: props.appMeta }
  );

  return (
    <RenderContext.Provider
      value={{ state: renderState, dispatch }}
    >
      {props.children}
    </RenderContext.Provider>
  );
};

export const useFormRenderStore = () => {
  const context = useContext(RenderContext);
  if (!context) {
    throw new Error(
      "useFormDesignerStore must be used within a FormRenderState"
    );
  }

  return [context.state, context.dispatch] as const;
};
