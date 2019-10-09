import * as fromWarmupTemplateActions from '../actions/warmup-template.actions';
import { WarmupTemplateInterface } from '../../types/warmup-template';
import { defaultWarmupTemplates } from '../presets/default-warmup-templates';

export interface WarmupState {
  templates: WarmupTemplateInterface[];
}

export const initialState: WarmupState = {
  templates: defaultWarmupTemplates
};
export function reducer(
  state = initialState,
  action: fromWarmupTemplateActions.ActionsUnion
): WarmupState {
  switch (action.type) {

    case fromWarmupTemplateActions.ActionTypes.LoadState: {
      return {
        ...action.payload
      };
    }

    case fromWarmupTemplateActions.ActionTypes.CreateWarmupTemplate: {
      return {
        ...state,
        templates: [
          ...state.templates,
          {
            id: 'tid' + Date.now(),
            name: 'New Template',
            sets: []
          }
        ]
      };
    }

    case fromWarmupTemplateActions.ActionTypes.DeleteWarmupTemplate: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload;
      });
      if (templateIndex !== -1) {
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return {
          ...state
        };
      }
    }

    case fromWarmupTemplateActions.ActionTypes.AdjustPercentage: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload.templateId;
      });
      if (templateIndex !== -1) {
        const adjustedTemplate: WarmupTemplateInterface = {
          ...state.templates[templateIndex],
          sets: [
            ...state.templates[templateIndex].sets.slice(0, action.payload.setIndex),
            {
              percentage: action.payload.value,
              reps: state.templates[templateIndex].sets[action.payload.setIndex].reps
            },
            ...state.templates[templateIndex].sets.slice(action.payload.setIndex + 1)
          ]
        };
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            adjustedTemplate,
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromWarmupTemplateActions.ActionTypes.AdjustReps: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload.templateId;
      });
      if (templateIndex !== -1) {
        const adjustedTemplate: WarmupTemplateInterface = {
          ...state.templates[templateIndex],
          sets: [
            ...state.templates[templateIndex].sets.slice(0, action.payload.setIndex),
            {
              reps: action.payload.value,
              percentage: state.templates[templateIndex].sets[action.payload.setIndex].percentage
            },
            ...state.templates[templateIndex].sets.slice(action.payload.setIndex + 1)
          ]
        };
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            adjustedTemplate,
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromWarmupTemplateActions.ActionTypes.AddSet: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload.templateId;
      });
      if (templateIndex !== -1) {
        const adjustedTemplate: WarmupTemplateInterface = {
          ...state.templates[templateIndex],
          sets: [
            ...state.templates[templateIndex].sets,
            {
              percentage: 1,
              reps: 5
            }
          ]
        };
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            adjustedTemplate,
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromWarmupTemplateActions.ActionTypes.RemoveSet: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload.templateId;
      });
      if (templateIndex !== -1) {
        const adjustedTemplate: WarmupTemplateInterface = {
          ...state.templates[templateIndex],
          sets: [
            ...state.templates[templateIndex].sets.slice(0, action.payload.setIndex),
            ...state.templates[templateIndex].sets.slice(action.payload.setIndex + 1)
          ]
        };
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            adjustedTemplate,
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    case fromWarmupTemplateActions.ActionTypes.ChangeTemplateName: {
      const templateIndex = state.templates.findIndex(template => {
        return template.id === action.payload.templateId;
      });
      if (templateIndex !== -1) {
        const adjustedTemplate: WarmupTemplateInterface = {
          ...state.templates[templateIndex],
          name: action.payload.value
        };
        return {
          ...state,
          templates: [
            ...state.templates.slice(0, templateIndex),
            adjustedTemplate,
            ...state.templates.slice(templateIndex + 1)
          ]
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }

  }
}

export const getAllWarmupTemplates = (state: WarmupState) => state.templates;
export const getWarmupTemplateById = (state: WarmupState, props: { id: string }) =>
  state.templates.find(template => template.id === props.id);
