useEffect(() => {
  fetch("/api/blog")
    .then((res) => res.json())
    .then((data) => {
      console.log("Blogs:", data);   // 👈 must show array in console
      setBlogs(data);
      setLoading(false);
    });
}, []);