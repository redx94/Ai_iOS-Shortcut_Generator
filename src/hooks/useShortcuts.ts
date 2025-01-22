import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShortcutGenerator } from '../services/shortcutGenerator';
import { Shortcut } from '../types';

export function useShortcuts() {
  const queryClient = useQueryClient();
  const generator = ShortcutGenerator.getInstance();

  const generateShortcut = useMutation({
    mutationFn: (input: string) => generator.generateFromText(input),
    onSuccess: (newShortcut) => {
      queryClient.setQueryData<Shortcut[]>('shortcuts', (old = []) => [
        ...old,
        newShortcut,
      ]);
    },
  });

  const shortcuts = useQuery({
    queryKey: ['shortcuts'],
    queryFn: () => {
      // TODO: Implement actual API call
      return Promise.resolve([] as Shortcut[]);
    },
  });

  return {
    shortcuts: shortcuts.data ?? [],
    isLoading: shortcuts.isLoading,
    error: shortcuts.error,
    generateShortcut,
  };
}