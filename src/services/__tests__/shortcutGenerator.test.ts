import { describe, it, expect, beforeEach } from 'vitest';
import { ShortcutGenerator } from '../shortcutGenerator';
import { ShortcutActionType } from '../../types';

describe('ShortcutGenerator', () => {
  let generator: ShortcutGenerator;

  beforeEach(() => {
    generator = ShortcutGenerator.getInstance();
  });

  it('should be a singleton', () => {
    const instance1 = ShortcutGenerator.getInstance();
    const instance2 = ShortcutGenerator.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should generate a valid shortcut from text', async () => {
    const input = 'Create a location-based shortcut';
    const shortcut = await generator.generateFromText(input);

    expect(shortcut).toHaveProperty('id');
    expect(shortcut).toHaveProperty('name');
    expect(shortcut).toHaveProperty('description', input);
    expect(Array.isArray(shortcut.actions)).toBe(true);
  });

  it('should generate location action for location-related input', async () => {
    const input = 'Create a shortcut when I arrive at home';
    const shortcut = await generator.generateFromText(input);

    expect(shortcut.actions).toHaveLength(1);
    expect(shortcut.actions[0].type).toBe(ShortcutActionType.Location);
  });

  it('should throw error for invalid input', async () => {
    const input = '';
    await expect(generator.generateFromText(input)).rejects.toThrow();
  });
});