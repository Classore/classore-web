interface HasPermission {
  bundleId: string;
  courseIds: string[];
  selectedBundleId: string;
  selectedCourseId: string;
}

export const hasPermission = ({
  bundleId,
  courseIds,
  selectedBundleId,
  selectedCourseId,
}: HasPermission) => {
  if (bundleId === selectedBundleId) {
    return true;
  }

  if (courseIds.includes(selectedCourseId)) {
    return true;
  }

  return false;
};
