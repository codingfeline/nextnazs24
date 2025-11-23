function Contact() {
  return (
    <div className="h-content-area flex items-center justify-center">
      <form className="contact">
        <legend className="pt-3 pb-3 text-2xl text-[#3c6886]">Contact</legend>
        <label htmlFor="">
          Name
          <input type="text" placeholder="Name" />
        </label>
        <label htmlFor="">
          Email
          <input type="email" placeholder="Email" />
        </label>
        <label htmlFor="">
          Message
          <textarea name="mesasge" id="" placeholder="Message"></textarea>
        </label>
        <div className="actions">
          <button>Submit</button>
          <button>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default Contact
