import { Shortcut, ShortcutAction, ShortcutActionType } from '../types';
import { shortcutSchema } from '../utils/validation';

export class ShortcutGenerator {
  private static instance: ShortcutGenerator;

  private constructor() {}

  public static getInstance(): ShortcutGenerator {
    if (!ShortcutGenerator.instance) {
      ShortcutGenerator.instance = new ShortcutGenerator();
    }
    return ShortcutGenerator.instance;
  }

  public async generateFromText(input: string): Promise<Shortcut> {
    try {
      // TODO: Implement NLP processing
      const actions = await this.parseActions(input);
      
      const shortcut: Shortcut = {
        id: crypto.randomUUID(),
        name: this.generateName(input),
        description: input,
        actions,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Validate the generated shortcut
      const validated = shortcutSchema.parse(shortcut);
      return validated;
    } catch (error) {
      console.error('Error generating shortcut:', error);
      throw new Error('Failed to generate shortcut');
    }
  }

  private async parseActions(input: string): Promise<ShortcutAction[]> {
    // TODO: Implement actual NLP parsing
    const actions: ShortcutAction[] = [];
    
    // Example action generation
    if (input.toLowerCase().includes('location')) {
      actions.push({
        id: crypto.randomUUID(),
        type: ShortcutActionType.Location,
        parameters: {
          latitude: 0,
          longitude: 0,
          radius: 100,
        },
        order: actions.length,
      });
    }

    return actions;
  }

  private generateName(input: string): string {
    // TODO: Implement smarter name generation
    return `Shortcut ${new Date().toISOString()}`;
  }
}