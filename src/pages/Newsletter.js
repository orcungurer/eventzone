import NewsletterSignup from "../components/NewsletterSignup";
import PageContent from "../components/PageContent";

const Newsletter = () => {
  return (
    <PageContent title="Join our newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
};

export default Newsletter;

export const action = async ({ request }) => {
  // const data = await request.formData();
  // const email = data.get("email");

  return { message: "Signed up successfully!" };
};
