
set -e

echo "*************** BUILD Ckeditor ***************"
npm run build

echo "*************** Remove old from UI ***************"
rm -rf ../ui/public/ckeditor

echo "*************** Copy ckeditor to UI ***************"
mkdir -p ../ui/public/ckeditor
cp -r build/* ../ui/public/ckeditor/


echo "*************** Done ***************"
echo ""
