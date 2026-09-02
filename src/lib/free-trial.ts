/**
 * Free Trial Manager — Web
 *
 * Mirrors the logic from the mobile app's `freeTrialManager` utility.
 *
 * Rules:
 *  - If `is_paid === true`  → all modules are accessible (caller should short-circuit)
 *  - If `is_paid === false` → only the FIRST module of the FIRST chapter (sorted by sequence) is free.
 *    All other modules are locked behind the upgrade paywall.
 */

export type FreeTrialChapter = {
    id: string;
    sequence?: number;
    modules: FreeTrialModule[];
};

export type FreeTrialModule = {
    id: string;
    sequence?: number;
};

type FreeModuleResult = {
    chapter: FreeTrialChapter;
    module: FreeTrialModule;
} | null;

/**
 * Returns the single free module (first module of first chapter).
 */
export function getFreeModule(chapters: FreeTrialChapter[]): FreeModuleResult {
    if (!chapters || chapters.length === 0) return null;

    const sortedChapters = [...chapters].sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    const firstChapter = sortedChapters[0];

    if (!firstChapter?.modules?.length) return null;

    const sortedModules = [...firstChapter.modules].sort(
        (a, b) => (a.sequence ?? 0) - (b.sequence ?? 0)
    );
    const firstModule = sortedModules[0];
    if (!firstModule) return null;

    return { chapter: firstChapter, module: firstModule };
}

/**
 * Returns true if the given chapterId + moduleId is accessible for a free (unpaid) user.
 *
 * Only the first module of the first chapter is accessible without payment.
 */
export function canAccessModule(
    chapterId: string,
    moduleId: string,
    chapters: FreeTrialChapter[]
): boolean {
    const freeModule = getFreeModule(chapters);
    if (!freeModule) return false;

    return freeModule.chapter.id === chapterId && freeModule.module.id === moduleId;
}

/**
 * Returns true if the given module is the free (first) module of a chapter.
 * Used to show/hide lock icons in module lists.
 */
export function isModuleFree(
    chapterId: string,
    moduleId: string,
    chapters: FreeTrialChapter[]
): boolean {
    return canAccessModule(chapterId, moduleId, chapters);
}
