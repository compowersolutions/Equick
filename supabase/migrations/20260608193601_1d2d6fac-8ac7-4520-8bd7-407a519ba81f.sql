
-- Lock down has_role
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO service_role;

-- Storage RLS for the resources bucket
CREATE POLICY "Admins can upload resource files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'resources'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update resource files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'resources'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete resource files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'resources'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can list resource files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resources'
    AND public.has_role(auth.uid(), 'admin')
  );
